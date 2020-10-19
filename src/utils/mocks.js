// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 } from 'uuid';
// eslint-disable-next-line import/prefer-default-export
export const cardMock = () => {
  const cardTitle = 'Sample title';
  const userId = '1234';
  const character = 'typeValue';
  const side1 = 'first side text';
  const side2 = 'second side text';
  const side3 = 'third side text';
  const side4 = 'fourth side text';

  return {
    cardTitle,
    type: character,
    createdBy: userId,
    side1,
    side2,
    side3,
    side4,
    id: v4(),
  };
};

export const deckMock = () => ({
  name: 'My Deck',
  description: 'This describes stuff',
  visibility: 'public',
  characterCards: [{ label: 'Character', value: 'CharacterIdPath' }],
  circumstanceCards: [{ label: 'Circumstance', value: 'CircumstanceIdPath' }],
  conflictCards: [{ label: 'Conflict', value: 'ConflictIdPath' }],
  id: v4(),
});
