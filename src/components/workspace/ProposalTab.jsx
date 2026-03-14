import React, { useState, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { uploadToCloudinary } from "@/components/utils/cloudinaryUpload";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Plus, ChevronLeft, ChevronRight, FileText, Image, Type, Trash2,
  Loader2, Send, CheckCircle2, XCircle, ThumbsUp, RotateCcw, Edit, X, Upload
} from "lucide-react";

const STATUS_CONFIG = {
  draft: { label: "Draft", className: "bg-zinc-100 text-zinc-600 border-zinc-200" },
  sent: { label: "Sent", className: "bg-sky-50 text-sky-700 border-sky-200" },
  approved: { label: "Approved", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  changes_requested: { label: "Changes Requested", className: "bg-orange-50 text-orange-700 border-orange-200" },
};

function SlideEditor({ slide, onChange, onDelete, index }) {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await uploadToCloudinary(file, { folder: "filmos/proposals" });
    onChange({ ...slide, image_url: file_url });
    setUploading(false);
  };

  return (
    <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Slide {index + 1}</span>
        <div className="flex gap-2">
          <select
            value={slide.type}
            onChange={(e) => onChange({ ...slide, type: e.target.value })}
            className="text-xs border border-zinc-200 rounded-md px-2 py-1 bg-white text-zinc-700"
          >
            <option value="text">Text only</option>
            <option value="image">Image only</option>
            <option value="image_text">Image + Text</option>
          </select>
          <button onClick={onDelete} className="p-1 text-zinc-400 hover:text-red-500 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {(slide.type === "image" || slide.type === "image_text") && (
        <div>
          {slide.image_url ? (
            <div className="relative group rounded-lg overflow-hidden">
              <img src={slide.image_url} alt="slide" className="w-full h-40 object-cover rounded-lg" />
              <button
                onClick={() => onChange({ ...slide, image_url: "" })}
                className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="w-full h-32 border-2 border-dashed border-zinc-300 rounded-lg flex flex-col items-center justify-center gap-2 text-zinc-400 hover:border-sky-400 hover:text-sky-500 transition-colors"
              >
                {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
                <span className="text-xs">{uploading ? "Uploading..." : "Click to upload image"}</span>
              </button>
            </>
          )}
        </div>
      )}

      {(slide.type === "text" || slide.type === "image_text") && (
        <div className="space-y-2">
          <Input
            placeholder="Slide heading (optional)"
            value={slide.heading || ""}
            onChange={(e) => onChange({ ...slide, heading: e.target.value })}
            className="text-sm"
          />
          <Textarea
            placeholder="Slide text..."
            value={slide.text || ""}
            onChange={(e) => onChange({ ...slide, text: e.target.value })}
            rows={3}
            className="text-sm resize-none"
          />
        </div>
      )}
    </div>
  );
}

function SlideViewer({ slides, currentIndex, onPrev, onNext }) {
  const slide = slides[currentIndex];
  if (!slide) return null;

  return (
    <div className="relative bg-zinc-900 rounded-2xl overflow-hidden aspect-video flex items-center justify-center">
      {(slide.type === "image" || slide.type === "image_text") && slide.image_url && (
        <img
          src={slide.image_url}
          alt="slide"
          className={`${slide.type === "image_text" ? "absolute inset-0 w-full h-full object-cover opacity-60" : "absolute inset-0 w-full h-full object-cover"}`}
        />
      )}

      {(slide.type === "text" || slide.type === "image_text") && (slide.heading || slide.text) && (
        <div className={`relative z-10 px-10 py-8 text-center max-w-2xl mx-auto ${slide.type === "image_text" ? "text-white" : "text-zinc-100"}`}>
          {slide.heading && (
            <h2 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">{slide.heading}</h2>
          )}
          {slide.text && (
            <p className="text-sm md:text-base leading-relaxed opacity-90">{slide.text}</p>
          )}
        </div>
      )}

      {slide.type === "image" && slide.image_url && !slide.heading && !slide.text && null}

      {/* Navigation */}
      {slides.length > 1 && (
        <>
          <button
            onClick={onPrev}
            disabled={currentIndex === 0}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center disabled:opacity-30 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={onNext}
            disabled={currentIndex === slides.length - 1}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center disabled:opacity-30 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? "bg-white" : "bg-white/40"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function ProposalTab({ proposals, projectId, isClient, clientName, onUpdated }) {
  const [builderOpen, setBuilderOpen] = useState(false);
  const [editingProposal, setEditingProposal] = useState(null);
  const [title, setTitle] = useState("");
  const [slides, setSlides] = useState([{ type: "image_text", image_url: "", heading: "", text: "" }]);
  const [saving, setSaving] = useState(false);
  const [viewingProposal, setViewingProposal] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [responseNotes, setResponseNotes] = useState({});
  const [responding, setResponding] = useState(null);

  const openBuilder = (proposal = null) => {
    if (proposal) {
      setEditingProposal(proposal);
      setTitle(proposal.title);
      setSlides(proposal.slides?.length ? proposal.slides : [{ type: "image_text", image_url: "", heading: "", text: "" }]);
    } else {
      setEditingProposal(null);
      setTitle("");
      setSlides([{ type: "image_text", image_url: "", heading: "", text: "" }]);
    }
    setBuilderOpen(true);
  };

  const addSlide = () => {
    setSlides(prev => [...prev, { type: "image_text", image_url: "", heading: "", text: "" }]);
  };

  const updateSlide = (index, updated) => {
    setSlides(prev => prev.map((s, i) => i === index ? updated : s));
  };

  const deleteSlide = (index) => {
    setSlides(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = async (asDraft) => {
    if (!title.trim()) return;
    setSaving(true);
    const data = { project_id: projectId, title, slides, status: asDraft ? "draft" : "sent" };
    if (editingProposal) {
      await base44.entities.Proposal.update(editingProposal.id, data);
    } else {
      await base44.entities.Proposal.create(data);
      await base44.entities.Activity.create({
        project_id: projectId,
        type: "status_change",
        description: `Proposal "${title}" was sent to client`,
        actor_name: "Filmmaker",
      });
    }
    setSaving(false);
    setBuilderOpen(false);
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

  return (
    <div className="space-y-6">
      {/* Filmmaker actions */}
      {!isClient && (
        <div className="flex justify-end">
          <Button onClick={() => openBuilder()} className="bg-zinc-900 hover:bg-zinc-800">
            <Plus className="w-4 h-4 mr-2" />
            New Proposal
          </Button>
        </div>
      )}

      {/* Proposals list */}
      {proposals.length === 0 ? (
        <div className="bg-white border border-zinc-200 rounded-xl p-12 text-center">
          <FileText className="w-10 h-10 text-zinc-300 mx-auto mb-3" />
          <p className="text-sm text-zinc-500">No proposals yet</p>
          {!isClient && <p className="text-xs text-zinc-400 mt-1">Create a slideshow proposal to share with your client.</p>}
        </div>
      ) : (
        <div className="space-y-4">
          {proposals.map((proposal) => {
            const conf = STATUS_CONFIG[proposal.status] || STATUS_CONFIG.draft;
            const isPendingReview = isClient && proposal.status === "sent";
            const firstImageSlide = proposal.slides?.find(s => s.image_url);

            return (
              <div key={proposal.id} className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
                <div className="flex gap-4 p-5">
                  {/* Thumbnail */}
                  <div
                    className="w-24 h-16 rounded-lg overflow-hidden bg-zinc-100 flex-shrink-0 cursor-pointer"
                    onClick={() => openViewer(proposal)}
                  >
                    {firstImageSlide ? (
                      <img src={firstImageSlide.image_url} alt="thumb" className="w-full h-full object-cover" />
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

                {/* Client response area */}
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
                      <Button
                        onClick={() => handleClientRespond(proposal, "approved")}
                        disabled={responding === proposal.id}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        {responding === proposal.id ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <ThumbsUp className="w-4 h-4 mr-2" />}
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleClientRespond(proposal, "changes_requested")}
                        disabled={responding === proposal.id}
                        variant="outline"
                        className="flex-1 border-orange-300 text-orange-700 hover:bg-orange-50"
                      >
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

      {/* Slideshow viewer modal */}
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

      {/* Builder modal */}
      <Dialog open={builderOpen} onOpenChange={setBuilderOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProposal ? "Edit Proposal" : "New Proposal"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <Label>Proposal Title</Label>
              <Input
                placeholder="e.g. Wedding Film Proposal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1.5"
              />
            </div>

            {/* Slides */}
            <div className="space-y-3">
              <Label>Slides</Label>
              {slides.map((slide, i) => (
                <SlideEditor
                  key={i}
                  slide={slide}
                  index={i}
                  onChange={(updated) => updateSlide(i, updated)}
                  onDelete={() => deleteSlide(i)}
                />
              ))}
              <Button variant="outline" onClick={addSlide} className="w-full border-dashed">
                <Plus className="w-4 h-4 mr-2" />
                Add Slide
              </Button>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => handleSave(true)}
                disabled={saving || !title.trim()}
                className="flex-1"
              >
                Save as Draft
              </Button>
              <Button
                onClick={() => handleSave(false)}
                disabled={saving || !title.trim()}
                className="flex-1 bg-sky-600 hover:bg-sky-700 text-white"
              >
                {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                Save & Send
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}