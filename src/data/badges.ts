import { PlayCircle, Beaker, FlaskConical, Atom, Trophy, Award, Star } from 'lucide-react';

export const BADGE_DETAILS: Record<string, { icon: any, label: string, color: string, bg: string, description: string }> = {
  'welcome': { 
    icon: Star, 
    label: 'Kimya Neferi', 
    color: 'text-yellow-400', 
    bg: 'bg-yellow-500/10',
    description: 'ReaksiyonLab ailesine katılarak ilk adımını attın!'
  },
  'ai_explorer': { 
    icon: Atom, 
    label: 'Yapay Zeka Kaşifi', 
    color: 'text-indigo-400', 
    bg: 'bg-indigo-500/10',
    description: 'Yapay zeka asistanı ile ilk konuşmanı gerçekleştirdin.'
  },
  'score_king': { 
    icon: Trophy, 
    label: 'Puan Kralı', 
    color: 'text-orange-400', 
    bg: 'bg-orange-500/10',
    description: '1000 puan barajını aşarak gerçek bir rekabetçi olduğunu gösterdin.'
  },
  'first_step': { 
    icon: PlayCircle, 
    label: 'Kimya Yolcusu', 
    color: 'text-blue-400', 
    bg: 'bg-blue-500/10',
    description: 'İlk modülünü tamamladın ve yolculuğun başladı!'
  },
  'chemist_apprentice': { 
    icon: Beaker, 
    label: 'Element Uzmanı', 
    color: 'text-emerald-400', 
    bg: 'bg-emerald-500/10',
    description: '2 modül tamamlayarak temel element bilgilerinde uzmanlaştın.'
  },
  'lab_technician': { 
    icon: FlaskConical, 
    label: 'Deney Ustası', 
    color: 'text-amber-400', 
    bg: 'bg-amber-500/10',
    description: '4 modül tamamlayan bir laboratuvar ustasısın!'
  },
  'molecular_master': { 
    icon: Atom, 
    label: 'Moleküler Deha', 
    color: 'text-purple-400', 
    bg: 'bg-purple-500/10',
    description: '6 modül tamamlayarak moleküler seviyede deha olduğunu kanıtladın.'
  },
  'grand_chemist': { 
    icon: Trophy, 
    label: 'Nobel Adayı', 
    color: 'text-rose-400', 
    bg: 'bg-rose-500/10',
    description: '9 modül bitirdin! Geleceğin Nobel ödüllü kimyageri.'
  }
};
