import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export default function GameOver({ gameId, backendUrl, restartGame }) {
  const [highScoreGames, setHighScoreGames] = useState([]);

  useEffect(() => {
    async function getHighScores() {
      const response = await fetch(backendUrl + "/games");
      const games = await response.json();
      setHighScoreGames(games);
    }
    getHighScores();
  }, []);

  return (
    <div className="game-over-container">
      <div className="game-over">
        <button onClick={restartGame}>Play Again</button>
        <h1>High Scores</h1>
        <table>
          <tr>
            <th>Name</th>
            <th>Score</th>
          </tr>
          {highScoreGames.map((game) => (
            <tr
              key={game.id}
              className={game.id == gameId ? "current-user" : ""}
            >
              <td>{game.name}</td>
              <td>{game.score}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

GameOver.propTypes = {
  gameId: PropTypes.integer,
  backendUrl: PropTypes.string,
};
