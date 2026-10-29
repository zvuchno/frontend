import { UploadPage } from "@/screens/artist/showcase";

async function Upload({ 
  params,
  searchParams
}: { 
  params: Promise<{ type: "release" | "merch" }>;
  searchParams: Promise<{id: string}>
}) {
  const { type  } = await params;
  const { id } = await searchParams;
  return (
    <UploadPage productType={type} id={id}/>
  )
};

export default Upload;