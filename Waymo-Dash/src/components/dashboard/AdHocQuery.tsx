import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useAdHocQuery } from "@/hooks/useEdgeCaseData";
import { PlayCircle, Camera } from "lucide-react";

interface AdHocQueryProps {
  onViewThumbnail: (frameId: string) => void;
}

export const AdHocQuery = ({ onViewThumbnail }: AdHocQueryProps) => {
  const [selectedQuery, setSelectedQuery] = useState<string | null>(null);
  const { data: results, isLoading } = useAdHocQuery(selectedQuery);

  const queries = [
    { value: "high_severity", label: "High Severity Cases (>0.8)" },
    { value: "sudden_stops", label: "Sudden Stops Analysis" },
    { value: "lane_changes", label: "Aggressive Lane Changes" },
    { value: "proximity_events", label: "Close Proximity Events" },
  ];

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PlayCircle className="h-5 w-5 text-accent" />
          Ad-Hoc Query Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-end gap-4">
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium">Run Ad-Hoc Analysis</label>
            <Select value={selectedQuery || ""} onValueChange={setSelectedQuery}>
              <SelectTrigger>
                <SelectValue placeholder="Select a query to run" />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50">
                {queries.map((query) => (
                  <SelectItem key={query.value} value={query.value}>
                    {query.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {selectedQuery && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Results:</h4>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-pulse-subtle text-muted-foreground">Loading results...</div>
              </div>
            ) : (
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Frame ID</TableHead>
                      <TableHead>File</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Result</TableHead>
                      <TableHead>Thumbnail</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results?.map((row: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell className="font-mono text-xs">{row.frame_id}</TableCell>
                        <TableCell className="text-sm">{row.file}</TableCell>
                        <TableCell className="text-sm">{row.edge_case_type}</TableCell>
                        <TableCell>
                          <span className="font-semibold">{row.severity}</span>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{row.result}</TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onViewThumbnail(row.frame_id)}
                          >
                            <Camera className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
