import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useFrameDetail } from "@/hooks/useEdgeCaseData";
import { Loader2 } from "lucide-react";

interface ThumbnailModalProps {
  frameId: string | null;
  onClose: () => void;
}

export const ThumbnailModal = ({ frameId, onClose }: ThumbnailModalProps) => {
  const { data: frame, isLoading } = useFrameDetail(frameId);

  return (
    <Dialog open={!!frameId} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            Frame {frame?.frame_id} - {frame?.edge_case_type}
          </DialogTitle>
        </DialogHeader>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Thumbnail Image */}
            <div className="bg-muted rounded-lg overflow-hidden">
              <img
                src={`data:image/jpeg;base64,${frame?.thumbnail}`}
                alt={`Frame ${frame?.frame_id}`}
                className="w-full h-auto"
              />
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold text-muted-foreground">Frame ID:</span>
                <p className="font-mono">{frame?.frame_id}</p>
              </div>
              <div>
                <span className="font-semibold text-muted-foreground">File:</span>
                <p>{frame?.file}</p>
              </div>
              <div>
                <span className="font-semibold text-muted-foreground">Edge Case Type:</span>
                <p>{frame?.edge_case_type}</p>
              </div>
              <div>
                <span className="font-semibold text-muted-foreground">Severity:</span>
                <p className="font-semibold">{frame?.severity}</p>
              </div>
              <div>
                <span className="font-semibold text-muted-foreground">Intent:</span>
                <p>{frame?.intent}</p>
              </div>
              <div>
                <span className="font-semibold text-muted-foreground">Speed:</span>
                <p>{frame?.speed} m/s</p>
              </div>
              <div>
                <span className="font-semibold text-muted-foreground">Acceleration:</span>
                <p>{frame?.accel} m/s²</p>
              </div>
              <div>
                <span className="font-semibold text-muted-foreground">Timestamp:</span>
                <p className="font-mono text-xs">{frame?.timestamp}</p>
              </div>
              <div className="col-span-2">
                <span className="font-semibold text-muted-foreground">Reason:</span>
                <p>{frame?.reason}</p>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
