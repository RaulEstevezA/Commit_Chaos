const PLAYER_TOKEN = '{player}';

export function personalize(text: string, playerName: string): string {
  return text.replaceAll(PLAYER_TOKEN, playerName);
}
