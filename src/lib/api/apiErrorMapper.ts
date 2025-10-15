import axios from "axios";

export interface MappedError {
  message: string;
  status: number | null;
};

export function mapApiError(error: unknown): MappedError {
  if (axios.isAxiosError(error)) {
    const status = error?.response?.status ?? null;
    const message = error?.response?.data?.error || "Unexpected error.";
  
    return { message, status };
  }

  return { status: null, message: "Unknown error." };
};
