"use client";

export interface fetchDataResponse<T> {
  success: boolean;
  message: string | null;
  data: T | null;
}

export async function fetchDataClient<T>(
  endpoint: string,
  options?: RequestInit
): Promise<fetchDataResponse<T>> {
  const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_SERVER_URL belum didefinisikan");
  }

  // Hapus garis miring di awal dan akhir endpoint, lalu gabungkan dengan API_URL
  endpoint = endpoint.replace(/^\/|\/$/g, "");
  const url = `${API_URL}/${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
      credentials: "include", // Sertakan cookie jika diperlukan
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonResponse = await response.json();

    return {
      success: jsonResponse.success === undefined ? true : jsonResponse.success,
      message: jsonResponse.message || "Permintaan berhasil",
      data: jsonResponse.data === undefined ? jsonResponse : jsonResponse.data,
    };
  } catch (error) {
    console.error("Fetch error:", error);
    return {
      success: false,
      message: (error as Error).message,
      data: null,
    };
  }
}
