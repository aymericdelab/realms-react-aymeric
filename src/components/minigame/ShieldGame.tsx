import React, { useEffect, useState } from "react";
import BN from "bn.js";
import { ElementToken } from "~/constants";
import { GameContext, getGameContextVariables } from "~/util/minigameApi";
import Castle from "./Castle";
import { toBN } from "starknet/dist/utils/number";
import GameBlockTimer from "./GameBlockTimer";
import AddressIndicator from "~/shared/AddressIndicator";
import classNames from "classnames";
import GameControls from "./GameControls";
import { GameStatus } from "~/types";
import TowerDefence from "../TowerDefence";

type Prop = {};

const ShieldGame: React.FC<Prop> = (props) => {
  // Contract state
  const [gameIdx, setGameIdx] = useState<string>();
  const [mainHealth, setMainHealth] = useState<BN>();
  const [_startBlockNum, setStartBlockNum] = useState<BN>();
  const [shieldValue, _setShieldValue] = useState<
    Record<ElementToken, string> | undefined
  >();

  const [gameCtx, setGameCtx] = useState<GameContext>();

  const [boost, setBoost] = useState<number>();

  const fetchState = async () => {
    const gameCtx = await getGameContextVariables();

    setGameIdx(gameCtx.gameIdx);
    setMainHealth(toBN(gameCtx.mainHealth));
    setStartBlockNum(gameCtx.gameStartBlock);
    setBoost(gameCtx.currentBoost);
    setGameCtx(gameCtx);
  };

  // Fetch state on mount
  useEffect(() => {
    fetchState();
  }, []);

  const lastBlockOfCurrentGame = gameCtx
    ? gameCtx.gameStartBlock.toNumber() +
    gameCtx.blocksPerMinute * 60 * gameCtx.hoursPerGame
    : undefined;

  const gameIsActive =
    gameCtx &&
    lastBlockOfCurrentGame !== undefined &&
    gameCtx.currentBlock.toNumber() < lastBlockOfCurrentGame;

  let gameStatus: GameStatus;
  if (gameIsActive) {
    if (mainHealth?.lte(toBN(0))) {
      gameStatus = "completed";
    } else {
      gameStatus = "active";
    }
  } else {
    gameStatus = "expired";
  }

  return (
    <div className="">
      <div className="">
        <h3 className="flex justify-between">
          <span className="text-2xl">
            Desiege <span className="text-sm"> game #</span>
            {gameIdx ? toBN(gameIdx).toNumber() : null}
            {gameCtx ? (
              <span
                className={classNames(
                  "text-sm text-gray-500 p-1 rounded-sm ml-4 font-semibold",
                  gameIsActive ? "bg-green-200" : "bg-red-200"
                )}
              >
                {gameStatus.toUpperCase()}
              </span>
            ) : null}
          </span>
          <AddressIndicator />
        </h3>
        <div>
          <GameBlockTimer gameCtx={gameCtx} />
        </div>

        <div className="flex flex-row justify-between mx-60">
          <GameControls
            gameStatus={gameStatus}
            gameIdx={gameIdx ? parseInt(gameIdx) : undefined}
            currentBoostBips={boost}
          />
          <div id="fortress-container">
            <p className="text-4xl">Fortress</p>
            <p className="text-2xl">
              Vitality: {mainHealth?.div(toBN(100)).toNumber().toFixed(2)}
            </p>
            <p>
              Dark Shield Value:{" "}
              {shieldValue ? shieldValue[ElementToken.Dark].toString() : "-"}
            </p>
            <p>
              Light Shield Value:{" "}
              {shieldValue ? shieldValue[ElementToken.Light].toString() : "-"}
            </p>
            {/* {mainHealth ? <Castle health={mainHealth.toNumber()} /> : null} */}
          </div>
        </div>
      </div>

      <TowerDefence />
    </div>
  );
};
export default ShieldGame;
