import { Avatar } from '@arco-design/web-react';

export function renderHealth(health: number) {
  const map = ['😵', '😨', '🤔', '😙'];
  return <Avatar className="avatar">{map[health]}</Avatar>;
}
