
import getSongs from "@/actions/getSongs";
import Header from "@/components/Header";
import PageContent from "./components/PageContent";

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();
  return (
    <div className='
      bg-neutral-900
      rounded-md
      h-full
      w-full
      overflow-hidden
      overflow-y-auto
    '>
      <Header>
        header
      </Header>
      <div className="text-white">
        <h1 className="font-bold text-3xl p-5">Popular Songs</h1>
        <PageContent songs={songs} />
      </div>
    </div>
  );
}