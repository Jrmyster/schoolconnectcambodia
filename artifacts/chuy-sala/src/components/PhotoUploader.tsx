import { useRef, useState } from "react";
import { Camera, Image as GalleryIcon, X, Loader2, CheckCircle } from "lucide-react";

interface PhotoUploaderProps {
  onUpload: (url: string) => void;
  currentUrl?: string;
  label?: string;
}

export function PhotoUploader({ onUpload, currentUrl, label = "Photo" }: PhotoUploaderProps) {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(currentUrl || null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setError(null);
    setUploaded(false);

    // Show local preview immediately
    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("photo", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      onUpload(data.url);
      setUploaded(true);
    } catch (err) {
      setError("Upload failed. Please try again.");
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    // Reset input so the same file can be re-selected
    e.target.value = "";
  };

  const clearPhoto = () => {
    setPreview(null);
    setUploaded(false);
    setError(null);
    onUpload("");
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-bold text-foreground">{label}</label>

      {/* Hidden file inputs */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleInputChange}
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleInputChange}
      />

      {preview ? (
        /* Preview state */
        <div className="relative rounded-2xl overflow-hidden border-2 border-primary/30 bg-muted">
          <img
            src={preview}
            alt="Upload preview"
            className="w-full h-48 object-cover"
          />
          {/* Overlay status */}
          <div className="absolute inset-0 flex items-center justify-center">
            {uploading && (
              <div className="bg-black/60 rounded-xl px-4 py-2 flex items-center gap-2 text-white font-semibold text-sm backdrop-blur-sm">
                <Loader2 className="w-4 h-4 animate-spin" />
                Uploading...
              </div>
            )}
            {uploaded && (
              <div className="bg-green-600/90 rounded-xl px-4 py-2 flex items-center gap-2 text-white font-semibold text-sm backdrop-blur-sm">
                <CheckCircle className="w-4 h-4" />
                Uploaded!
              </div>
            )}
          </div>
          {/* Remove button */}
          {!uploading && (
            <button
              type="button"
              onClick={clearPhoto}
              className="absolute top-2 right-2 w-8 h-8 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          {/* Retake button */}
          {!uploading && (
            <div className="absolute bottom-2 right-2 flex gap-2">
              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-black/60 hover:bg-black/80 text-white rounded-lg text-xs font-semibold backdrop-blur-sm transition-colors"
              >
                <Camera className="w-3.5 h-3.5" />
                Retake
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Upload prompt */
        <div className="rounded-2xl border-2 border-dashed border-border bg-muted/30 p-6">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Camera button — triggers phone camera */}
            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              className="flex-1 flex items-center justify-center gap-3 py-4 px-5 rounded-xl bg-primary text-primary-foreground font-bold text-base shadow-md shadow-primary/20 active:scale-95 transition-all hover:bg-primary/90 min-h-[56px]"
            >
              <Camera className="w-5 h-5" />
              Take Photo
            </button>

            {/* Gallery button — choose from photo library */}
            <button
              type="button"
              onClick={() => galleryInputRef.current?.click()}
              className="flex-1 flex items-center justify-center gap-3 py-4 px-5 rounded-xl bg-secondary text-foreground font-bold text-base border-2 border-border active:scale-95 transition-all hover:bg-secondary/80 min-h-[56px]"
            >
              <GalleryIcon className="w-5 h-5" />
              Choose from Gallery
            </button>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-3">
            JPG, PNG or WEBP · Max 10MB
          </p>
        </div>
      )}

      {error && (
        <p className="text-sm text-destructive font-medium flex items-center gap-1">
          <X className="w-4 h-4" /> {error}
        </p>
      )}
    </div>
  );
}
