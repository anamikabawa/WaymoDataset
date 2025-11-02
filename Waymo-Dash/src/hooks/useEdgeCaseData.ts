import { useQuery } from "@tanstack/react-query";

const API_BASE = "http://localhost:8000";

// React Query hooks
export const useStats = () => {
  return useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/api/stats`);
      if (!res.ok) throw new Error("Failed to fetch stats");
      return res.json();
    },
  });
};

export const useFilters = () => {
  return useQuery({
    queryKey: ["filters"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/api/filters`);
      if (!res.ok) throw new Error("Failed to fetch filters");
      return res.json();
    },
  });
};

export const usePieChartData = () => {
  return useQuery({
    queryKey: ["charts", "pie"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/api/charts/pie`);
      if (!res.ok) throw new Error("Failed to fetch pie chart data");
      return res.json();
    },
  });
};

export const useHistogramData = () => {
  return useQuery({
    queryKey: ["charts", "histogram"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/api/charts/histogram`);
      if (!res.ok) throw new Error("Failed to fetch histogram data");
      return res.json();
    },
  });
};

export const useBoxPlotData = () => {
  return useQuery({
    queryKey: ["charts", "boxplot"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/api/charts/box-plot-data`);
      if (!res.ok) throw new Error("Failed to fetch box plot data");
      return res.json();
    },
  });
};

export const useTopFilesData = () => {
  return useQuery({
    queryKey: ["charts", "topfiles"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/api/charts/top-files`);
      if (!res.ok) throw new Error("Failed to fetch top files data");
      return res.json();
    },
  });
};

export const useIntentData = () => {
  return useQuery({
    queryKey: ["charts", "intent"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/api/charts/intent`);
      if (!res.ok) throw new Error("Failed to fetch intent data");
      return res.json();
    },
  });
};

export const useScatterData = () => {
  return useQuery({
    queryKey: ["charts", "scatter"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/api/charts/scatter`);
      if (!res.ok) throw new Error("Failed to fetch scatter data");
      return res.json();
    },
  });
};

export const usePreFlaggedData = (page: number) => {
  return useQuery({
    queryKey: ["preflagged", page],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/api/query/pre-flagged?page=${page}`);
      if (!res.ok) throw new Error("Failed to fetch pre-flagged data");
      return res.json();
    },
  });
};

export const useFrameDetail = (frameId: string | null) => {
  return useQuery({
    queryKey: ["frame", frameId],
    queryFn: async () => {
      if (!frameId) return null;
      const res = await fetch(`${API_BASE}/api/frame/${frameId}`);
      if (!res.ok) throw new Error("Failed to fetch frame detail");
      return res.json();
    },
    enabled: !!frameId,
  });
};

export const useAdHocQuery = (queryName: string | null) => {
  return useQuery({
    queryKey: ["adhoc", queryName],
    queryFn: async () => {
      if (!queryName) return [];
      const res = await fetch(`${API_BASE}/api/query/ad-hoc/${queryName}`);
      if (!res.ok) throw new Error(`Failed to fetch ad-hoc query: ${queryName}`);
      return res.json();
    },
    enabled: !!queryName,
  });
};
