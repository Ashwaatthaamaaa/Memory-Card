import '../../styles/header.css'
export default function Scoreboard({currScore,bestScore}){
    return(
        <>
            <div className="score">
                <div className="current">
                    Current Score:{currScore}
                </div>
                <div className="best">
                    Best Score:{bestScore}
                </div>
            </div>
        </>
    )
}