import React from "react";

export default function AddPlayer({ newPlayer, setNewPlayer, inputRef, addNewPlayer, isAddingPlayer }) {
  if (!isAddingPlayer) { return null; }
  return (
      <>
        <input type="text"
               value={ newPlayer }
               onChange={ e => setNewPlayer(e.target.value) }
               ref={ inputRef }
        />
        <button disabled={!newPlayer.trim().length} onClick={ addNewPlayer }>Add Player</button>
      </>
  );
}
