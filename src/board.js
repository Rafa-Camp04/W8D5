// DON'T TOUCH THIS CODE
if (typeof window === 'undefined'){
  var Piece = require("./piece");
}
// DON'T TOUCH THIS CODE


/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4].
 */
function _makeGrid() {
  const rows = 8;
  const columns = 8;

  let matrix = Array(rows).fill().map(() => 
    Array(columns).fill(undefined));

  matrix[3][4] = new Piece('black');
  matrix[4][3] = new Piece('black');
  matrix[3][3] = new Piece('white');
  matrix[4][4] = new Piece('white');
  
  return matrix;
}

/**
 * Constructs a Board with a starting grid set up.
 */
function Board () {
  this.grid = _makeGrid();
}

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
  let x = pos[0];
  let y = pos[1];

  if (x < 0 || y < 0) {
    return false;
  } else if (x > 7 || y > 7) {
    return false; 
  }
  return true;
};

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) {
  let x = pos[0];
  let y = pos[1];
  
  if (this.isValidPos(pos)) {
    return this.grid[x][y];
  } else {
    throw new Error("Not valid pos!");
  };
};

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {

  if (this.getPiece(pos) === undefined) {
    return false
  };

  if (this.getPiece(pos).color === color) {
    return true;
  } else {
    return false;
  };

};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  let x = pos[0];
  let y = pos[1];
  if (this.grid[x][y] != undefined) {
    return true;
  } else {
    return false;
  }
};

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns an empty array if it reaches the end of the board before finding 
 * another piece of the same color.
 *
 * Returns empty array if it hits an empty position.
 *
 * Returns empty array if no pieces of the opposite color are found.
 */
Board.prototype._positionsToFlip = function (pos, color, dir, piecesToFlip=[]) {
  let x = pos[0];
  let y = pos[1];
  let nextPos = [x + dir[0], y + dir[1]];

  if (!this.isValidPos(pos) || !this.isValidPos(nextPos)) { 
    return [];
  };

  if (!this.isOccupied(nextPos)) {
    return [];
  };

  if (this.isMine(nextPos,color)) {
    return piecesToFlip;
  } else {
    piecesToFlip.push(nextPos);
    return this._positionsToFlip(nextPos, color, dir, piecesToFlip);
  }

};

/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {

  if (this.isOccupied(pos)) {
    return false
  } 

  let arr = [];

  for (let i = 0; i < Board.DIRS.length; i++) {
    arr = arr.concat(this._positionsToFlip(pos, color, Board.DIRS[i]))
  };

  if (arr.length === 0) {
    return false
  };
  
  return true
};

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
};

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {
};

/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
};

/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
};

// DON'T TOUCH THIS CODE
if (typeof window === 'undefined'){
  module.exports = Board;
}
// DON'T TOUCH THIS CODE
