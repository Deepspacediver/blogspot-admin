import axiosInstance from "@/lib/axios.config";

type UploadFileProps = {
  file?: File;
};

export async function uploadFile({ file }: UploadFileProps) {
  const { data } = await axiosInstance.postForm<{ id: string; url: string }>(
    "/files",
    {
      file,
    },
  );
  return data;
}
