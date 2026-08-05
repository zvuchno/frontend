import { UploadPage } from "@/screens/artist/showcase";

async function Upload({ 
  params,
  searchParams
}: { 
  params: Promise<{ type: 'album' | 'single' | 'merch' }>;
  searchParams: Promise<{id: string}>
}) {
  const { type  } = await params;
  const { id } = await searchParams;
  return (
    <UploadPage type={type} id={id}/>
  )
};

export default Upload;