export interface CrosswordWord {
  word: string;
  clueEn: string;
  clueKm: string;
}

export interface PlacedWord extends CrosswordWord {
  row: number;
  col: number;
  direction: 'across' | 'down';
  number: number;
}

export interface CrosswordCell {
  letter: string;
  wordIds: string[];
  number?: number;
}

export interface CrosswordGrid {
  cells: (CrosswordCell | null)[][];
  placedWords: PlacedWord[];
  size: number;
}

export function generateCrossword(bank: CrosswordWord[], size: number = 20): CrosswordGrid {
  // 1. Pick 15 random words
  const shuffledBank = [...bank].sort(() => 0.5 - Math.random());
  const selectedWords = shuffledBank.slice(0, 15).sort((a, b) => b.word.length - a.word.length);

  // 2. Initialize empty grid
  const grid: (CrosswordCell | null)[][] = Array(size).fill(null).map(() => Array(size).fill(null));
  const placedWords: PlacedWord[] = [];

  const placeWord = (wordObj: CrosswordWord, r: number, c: number, dir: 'across' | 'down') => {
    const wordStr = wordObj.word;
    for (let i = 0; i < wordStr.length; i++) {
      const cr = dir === 'down' ? r + i : r;
      const cc = dir === 'across' ? c + i : c;
      if (!grid[cr][cc]) {
        grid[cr][cc] = { letter: wordStr[i], wordIds: [wordStr] };
      } else {
        grid[cr][cc]!.wordIds.push(wordStr);
      }
    }
    placedWords.push({ ...wordObj, row: r, col: c, direction: dir, number: 0 });
  };

  const isValidPlacement = (wordStr: string, startR: number, startC: number, dir: 'across' | 'down') => {
    const len = wordStr.length;
    // Bounds check
    if (dir === 'across' && startC + len > size) return false;
    if (dir === 'down' && startR + len > size) return false;
    if (startR < 0 || startC < 0) return false;

    let intersections = 0;
    
    // Check preceding and succeeding cells (they must be empty to avoid merging words)
    if (dir === 'across') {
      if (startC > 0 && grid[startR][startC - 1]) return false;
      if (startC + len < size && grid[startR][startC + len]) return false;
    } else {
      if (startR > 0 && grid[startR - 1][startC]) return false;
      if (startR + len < size && grid[startR + len][startC]) return false;
    }

    for (let i = 0; i < len; i++) {
      const r = dir === 'down' ? startR + i : startR;
      const c = dir === 'across' ? startC + i : startC;
      const char = wordStr[i];
      const cell = grid[r][c];

      if (cell) {
        if (cell.letter !== char) return false;
        intersections++;
      } else {
        // If it's an empty cell, check adjacent cells perpendicular to the direction
        // to ensure we aren't creating unwanted 2-letter parallel words
        if (dir === 'across') {
          if (r > 0 && grid[r - 1][c]) return false;
          if (r < size - 1 && grid[r + 1][c]) return false;
        } else {
          if (c > 0 && grid[r][c - 1]) return false;
          if (c < size - 1 && grid[r][c + 1]) return false;
        }
      }
    }

    return intersections > 0;
  };

  // Place first word (try to center it)
  if (selectedWords.length > 0) {
    const firstWord = selectedWords[0];
    const startRow = Math.floor(size / 2);
    const startCol = Math.floor(size / 2) - Math.floor(firstWord.word.length / 2);
    // Ensure bounds are safe
    const safeStartCol = Math.max(0, startCol);
    placeWord(firstWord, startRow, safeStartCol, 'across');
  }

  // Place remaining words iteratively
  for (let i = 1; i < selectedWords.length; i++) {
    const wordObj = selectedWords[i];
    const wordStr = wordObj.word;
    let placed = false;

    // Gather all currently occupied spots to test intersections
    const searchSpace = [];
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (grid[r][c]) {
          searchSpace.push({ r, c, cell: grid[r][c]! });
        }
      }
    }
    // Randomize to create different layouts
    searchSpace.sort(() => 0.5 - Math.random());

    for (const spot of searchSpace) {
      if (placed) break;
      const { r, c, cell } = spot;

      for (let j = 0; j < wordStr.length; j++) {
        if (wordStr[j] === cell.letter) {
          // Check what direction this existing letter is part of
          let isAcrossNode = false;
          let isDownNode = false;
          
          if ((c > 0 && grid[r][c - 1]) || (c < size - 1 && grid[r][c + 1])) isAcrossNode = true;
          if ((r > 0 && grid[r - 1][c]) || (r < size - 1 && grid[r + 1][c])) isDownNode = true;

          // Perpendicular placement preference
          if (isAcrossNode && !isDownNode) {
            const startR = r - j;
            if (isValidPlacement(wordStr, startR, c, 'down')) {
              placeWord(wordObj, startR, c, 'down');
              placed = true;
              break;
            }
          } else if (isDownNode && !isAcrossNode) {
            const startC = c - j;
            if (isValidPlacement(wordStr, r, startC, 'across')) {
              placeWord(wordObj, r, startC, 'across');
              placed = true;
              break;
            }
          } else if (!isAcrossNode && !isDownNode) {
            // Edge case: an isolated letter, pick horizontal
             const startC = c - j;
             if (isValidPlacement(wordStr, r, startC, 'across')) {
               placeWord(wordObj, r, startC, 'across');
               placed = true;
               break;
             }
          }
        }
      }
    }
  }

  // Number the words correctly (top-to-bottom, left-to-right)
  let numberCounter = 1;

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!grid[r][c]) continue;
      
      const startingWords = placedWords.filter(w => w.row === r && w.col === c);
      
      if (startingWords.length > 0) {
        grid[r][c]!.number = numberCounter;
        startingWords.forEach(w => w.number = numberCounter);
        numberCounter++;
      }
    }
  }

  return { cells: grid, placedWords, size };
}
