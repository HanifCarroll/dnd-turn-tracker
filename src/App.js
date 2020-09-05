import React, { useState, useRef } from 'react';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import './App.css';
import PlayerCard from "./components/PlayerCard";

function App() {
  const inputRef = useRef();
  const [players, setPlayers] = useState([]);
  const [phase, setPhase] = useState('');
  const [newPlayer, setNewPlayer] = useState('');
  const [isNewPlayer, setIsNewPlayer] = useState(false);
  const [isRemovePlayer, setIsRemovePlayer] = useState(false);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: 8,
    width: 250
  });


  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const reorderedPlayers = reorder(
        players,
        result.source.index,
        result.destination.index
    );

    setPlayers(reorderedPlayers)
  }
  const endTurn = () => {
    const newlyOrderedPlayers = [...players];
    const oldFirstPlayer = newlyOrderedPlayers.shift();
    newlyOrderedPlayers.push(oldFirstPlayer);
    setPlayers(newlyOrderedPlayers);
  }

  const addNewPlayer = () => {
    if (!newPlayer.trim().length) { return; }

    setPlayers(players.concat(newPlayer));
    setNewPlayer('');
    inputRef.current.focus();
    if (phase) {
      setIsNewPlayer(false);
    }
  }

  const onButtonClick = () => {
    if (!phase) {
      setPhase('start');
    }
    if (phase === 'start') {
      setPhase('play');
    }
    if (phase === 'battle') {
      setPhase('play');
    }
    if (phase === 'play') {
      endTurn();
    }
  }

  const getButtonText = () => {
    if (!phase) {
      return 'Start';
    }
    if (phase === 'start') {
      return 'Battle';
    }
    if (phase === 'battle') {
      return 'Play';
    }
    if (phase === 'play') {
      return 'End Turn';
    }
  }

  const toggleIsNewPlayer = () => {
    setIsNewPlayer(!isNewPlayer);
    if (isNewPlayer) {
      inputRef.current.focus();
    }
  }

  const isAddingPlayer = () => (phase) === 'start' || isNewPlayer;

  const removePlayer = (selectedPlayer) => {
    setPlayers(players.filter(player => player !== selectedPlayer));
    setIsRemovePlayer(false);
  }

  const gameIsInPlay = () => !['', 'start'].includes(phase);

  const battleIsDisabled = () => phase === 'start' && players.length < 2;

  return (
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="App">
          { isAddingPlayer() && (
              <>
                <input type="text"
                       value={ newPlayer }
                       onChange={ e => setNewPlayer(e.target.value) }
                       ref={ inputRef }
                />
                <button disabled={!newPlayer.trim().length} onClick={ addNewPlayer }>Add Player</button>
              </>
          ) }
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

          <button disabled={battleIsDisabled()} onClick={ onButtonClick }>{ getButtonText() }</button>
          { gameIsInPlay() && (
              <>
                <button onClick={ toggleIsNewPlayer }>Add Player</button>
                <button onClick={ () => setIsRemovePlayer(!isRemovePlayer) }>Remove Player</button>
              </>
          ) }
        </div>
      </DragDropContext>
  );
}

export default App;
