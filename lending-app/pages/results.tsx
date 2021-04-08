import { useRouter } from "next/router";

export default function Results() {
  const router = useRouter();
  const { approved, ficoScore } = router.query;
  const isApproved = parseInt(approved as string) === 0;
  const ficoRating = () => {
    const ficoAsNum =  parseInt(ficoScore as string);
    if (ficoAsNum >= 800) {
      return 'Exceptional'
    } else if (ficoAsNum >= 740) {
      return 'Very Good'
    } else if (ficoAsNum >= 670) {
      return 'Good'
    } else if (ficoAsNum >= 580) {
      return 'Fair'
    } else {
      return 'Very Poor'
    }
  }

  return (
    <div className="my-container">
      <h1 className="title">Based on your information, you have been:</h1>
      {isApproved ? (
        <h1 className="title" style={{color:"green"}}>Approved</h1>
      ) : (
        <h1 className="title" style={{color:"red"}}>Denied</h1>
      )}
      {(!isApproved && !(ficoRating() === 'Exceptional' || ficoRating() === 'Very Good')) &&
        <div className='results-details'>
          <h3>Your Fico Credit Score is <b>{ficoScore}</b></h3>
          <p>{`This is considered ${ficoRating()}. Try improving this score to improve your chances of getting approved.`}</p>
        </div>
      }
    </div>
  );
}
