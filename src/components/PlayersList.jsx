import { Droppable } from "react-beautiful-dnd";
import PlayerCard from "./PlayerCard";
import React from "react";

export default function PlayersList({ players, isRemovePlayer, removePlayer }) {
  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "white",
    padding: 8,
    width: 250
  });

  return (
    <Droppable droppableId="droppable">
      {(provided, snapshot) => (
          <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
          >
            {players.map((player, index) => (
                <PlayerCard
                    key={player}
                    player={player}
                    index={index}
                    isRemovePlayer={isRemovePlayer}
                    removePlayer={removePlayer}
                />
            ))}
            {provided.placeholder}
          </div>
      )}
    </Droppable>
  );
}
