export const MAX_FAMILARITY = 10;

export function reviewedAtAsString(date: number) {
  if (date !== 0) {
    return formatTimestamp(date);
  } else {
    return "---";
  }
}

export function fetchCardsToBePracticed(cards: Card[], deck: Deck) {
  const [newCards, existingCards] = partitionCardsByFamilarity(cards, deck);
  const sortedExistingCards = sortCardsByUrgency(existingCards, deck);
  var newCardsCount = numberOfNewCardsToBeIncluded(deck);
  if (existingCards.length < deck.cardsPerRound - newCardsCount)
    newCardsCount = deck.cardsPerRound - existingCards.length;

  return shuffleArray([
    ...newCards.slice(0, newCardsCount),
    ...sortedExistingCards.slice(0, deck.cardsPerRound - newCardsCount),
  ]);
}

function partitionCardsByFamilarity(
  cards: Card[],
  deck: Deck,
): [Card[], Card[]] {
  return cards.reduce(
    (acc, card) => {
      acc[
        (deck.reversed ? card.reverseFamilarity : card.familarity) === 0 ? 0 : 1
      ].push(card);
      return acc;
    },
    [[] as Card[], [] as Card[]],
  );
}

function numberOfNewCardsToBeIncluded(deck: Deck) {
  return Math.floor(deck.cardsPerRound * (deck.newCardsRatio / 100));
}

function sortCardsByUrgency(cards: Card[], deck: Deck) {
  const scoredCards = scoreCardsWithUrgency(cards, deck);
  return scoredCards
    .sort((cardOne, cardTwo) => {
      return (
        cardTwo.urgency +
        Math.random() * 0.1 -
        (cardOne.urgency + Math.random() * 0.1)
      );
    })
    .map((card) => card.card);
}

function scoreCardsWithUrgency(cards: Card[], deck: Deck) {
  const currentTime = Date.now();
  return cards.map((card) => {
    const familarity = deck.reversed ? card.reverseFamilarity : card.familarity;
    const lastReviewedAt = deck.reversed
      ? card.lastReverseReviewedAt
      : card.lastReviewedAt;
    const timeSinceReview = currentTime - lastReviewedAt;
    const urgency =
      timeSinceReview / Math.pow(deck.retentionExpansionBase, familarity);
    return { card, urgency };
  });
}
