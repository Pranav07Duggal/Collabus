import ContestDetailView from "@/modules/contests/ui/view/contest-deatil-view"



const ContestDetailPage = ({ params }: {params: {contestId : string }} ) => {
    const { contestId } = params;
  return (
    <div>
      <ContestDetailView contestId = { contestId }/>
    </div>
  )
}

export default ContestDetailPage
