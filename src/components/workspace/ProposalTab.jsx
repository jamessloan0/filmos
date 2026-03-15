import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, ChevronRight, FileText, Loader2, Send, ThumbsUp, RotateCcw, Edit } from "lucide-react";
import ProposalEditor from "@/components/proposals/ProposalEditor";
import SlideViewer from "@/components/proposals/SlideViewer";

const STATUS_CONFIG = {
  draft: { label: "Draft", className: "bg-zinc-100 text-zinc-600 border-zinc-200" },
  sent: { label: "Sent", className: "bg-sky-50 text-sky-700 border-sky-200" },
  approved: { label: "Approved", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  changes_requested: { label: "Changes Requested", className: "bg-orange-50 text-orange-700 border-orange-200" },
};

export default function ProposalTab({ proposals, projectId, isClient, clientName, onUpdated }) {
  const [builderOpen, setBuilderOpen] = useState(false);
  const [editingProposal, setEditingProposal] = useState(null);
  const [viewingProposal, setViewingProposal] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [responseNotes, setResponseNotes] = useState({});
  const [responding, setResponding] = useState(null);

  const openBuilder = (proposal = null) => {
    setEditingProposal(proposal || null);
    setBuilderOpen(true);
  };

  const handleSave = async (title, slides, asDraft) => {
    const data = { project_id: projectId, title, slides, status: asDraft ? "draft" : "sent" };
    if (editingProposal) {
      await base44.entities.Proposal.update(editingProposal.id, data);
    } else {
      await base44.entities.Proposal.create(data);
      if (!asDraft) {
        await base44.entities.Activity.create({
          project_id: projectId,
          type: "status_change",
          description: `Proposal "${title}" was sent to client`,
          actor_name: "Filmmaker",
        });
      }
    }
    setBuilderOpen(false);
    setEditingProposal(null);
    onUpdated();
  };

  const handleClientRespond = async (proposal, decision) => {
    setResponding(proposal.id);
    await base44.entities.Proposal.update(proposal.id, {
      status: decision,
      client_decision: responseNotes[proposal.id] || "",
      client_name: clientName,
    });
    await base44.entities.Activity.create({
      project_id: projectId,
      type: "status_change",
      description: `${clientName} ${decision === "approved" ? "approved" : "requested changes on"} proposal "${proposal.title}"`,
      actor_name: clientName,
    });
    setResponding(null);
    onUpdated();
  };

  const openViewer = (proposal) => {
    setViewingProposal(proposal);
    setCurrentSlide(0);
  };

  const getThumbnailImage = (proposal) => {
    for (const slide of (proposal.slides || [])) {
      for (const el of (slide.elements || [])) {
        if (el.type === "image" && el.src) return el.src;
      }
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {!isClient && (
        <div className="flex justify-end">
          <Button onClick={() => openBuilder()} className="bg-zinc-900 hover:bg-zinc-800">
            <Plus className="w-4 h-4 mr-2" />
            New Proposal
          </Button>
        </div>
      )}

      {proposals.length === 0 ? (
        <div className="bg-white border border-zinc-200 rounded-xl p-12 text-center">
          <FileText className="w-10 h-10 text-zinc-300 mx-auto mb-3" />
          <p className="text-sm text-zinc-500">No proposals yet</p>
          {!isClient && <p className="text-xs text-zinc-400 mt-1">Create a drag-and-drop proposal to share with your client.</p>}
        </div>
      ) : (
        <div className="space-y-4">
          {proposals.map((proposal) => {
            const conf = STATUS_CONFIG[proposal.status] || STATUS_CONFIG.draft;
            const isPendingReview = isClient && proposal.status === "sent";
            const thumb = getThumbnailImage(proposal);

            return (
              <div key={proposal.id} className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
                <div className="flex gap-4 p-5">
                  <div className="w-24 h-16 rounded-lg overflow-hidden bg-zinc-100 flex-shrink-0 cursor-pointer" onClick={() => openViewer(proposal)}>
                    {thumb ? (
                      <img src={thumb} alt="thumb" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FileText className="w-5 h-5 text-zinc-400" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-zinc-900">{proposal.title}</h3>
                        <p className="text-xs text-zinc-400 mt-0.5">
                          {proposal.slides?.length || 0} slides · {format(new Date(proposal.created_date), "MMM d, yyyy")}
                        </p>
                      </div>
                      <Badge variant="outline" className={`${conf.className} text-xs flex-shrink-0`}>
                        {conf.label}
                      </Badge>
                    </div>

                    {proposal.client_decision && (
                      <div className="mt-2 p-2 bg-zinc-50 rounded-lg">
                        <p className="text-xs text-zinc-500">
                          <span className="font-medium">{proposal.client_name || "Client"}:</span> {proposal.client_decision}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mt-3">
                      <Button variant="outline" size="sm" onClick={() => openViewer(proposal)}>
                        <ChevronRight className="w-3.5 h-3.5 mr-1" />
                        View
                      </Button>
                      {!isClient && (
                        <>
                          <Button variant="outline" size="sm" onClick={() => openBuilder(proposal)}>
                            <Edit className="w-3.5 h-3.5 mr-1" />
                            Edit
                          </Button>
                          {proposal.status === "draft" && (
                            <Button
                              size="sm"
                              className="bg-sky-600 hover:bg-sky-700 text-white"
                              onClick={async () => {
                                await base44.entities.Proposal.update(proposal.id, { status: "sent" });
                                onUpdated();
                              }}
                            >
                              <Send className="w-3.5 h-3.5 mr-1" />
                              Send to Client
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {isPendingReview && (
                  <div className="border-t border-zinc-100 p-4 bg-sky-50/50 space-y-3">
                    <p className="text-sm font-medium text-zinc-700">Your response</p>
                    <Textarea
                      placeholder="Add a note (optional)..."
                      value={responseNotes[proposal.id] || ""}
                      onChange={(e) => setResponseNotes(prev => ({ ...prev, [proposal.id]: e.target.value }))}
                      rows={2}
                      className="text-sm bg-white"
                    />
                    <div className="flex gap-2">
                      <Button onClick={() => handleClientRespond(proposal, "approved")} disabled={responding === proposal.id} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">
                        {responding === proposal.id ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <ThumbsUp className="w-4 h-4 mr-2" />}
                        Approve
                      </Button>
                      <Button onClick={() => handleClientRespond(proposal, "changes_requested")} disabled={responding === proposal.id} variant="outline" className="flex-1 border-orange-300 text-orange-700 hover:bg-orange-50">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Request Changes
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Viewer */}
      <Dialog open={!!viewingProposal} onOpenChange={(o) => !o && setViewingProposal(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-zinc-900">{viewingProposal?.title}</h2>
              <p className="text-xs text-zinc-400">{viewingProposal?.slides?.length} slides</p>
            </div>
            <Badge variant="outline" className={`${STATUS_CONFIG[viewingProposal?.status]?.className} text-xs`}>
              {STATUS_CONFIG[viewingProposal?.status]?.label}
            </Badge>
          </div>
          <div className="p-5">
            {viewingProposal?.slides?.length > 0 && (
              <>
                <SlideViewer
                  slides={viewingProposal.slides}
                  currentIndex={currentSlide}
                  onPrev={() => setCurrentSlide(i => Math.max(0, i - 1))}
                  onNext={() => setCurrentSlide(i => Math.min(viewingProposal.slides.length - 1, i + 1))}
                />
                <p className="text-center text-xs text-zinc-400 mt-3">
                  Slide {currentSlide + 1} of {viewingProposal.slides.length}
                </p>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Editor */}
      <Dialog open={builderOpen} onOpenChange={(o) => { if (!o) { setBuilderOpen(false); setEditingProposal(null); } }}>
        <DialogContent className="max-w-5xl w-full" style={{ height: "85vh", maxHeight: "85vh", display: "flex", flexDirection: "column" }}>
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>{editingProposal ? "Edit Proposal" : "New Proposal"}</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto min-h-0 mt-2">
            <ProposalEditor
              proposal={editingProposal}
              onSave={handleSave}
              onCancel={() => { setBuilderOpen(false); setEditingProposal(null); }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}