export interface SampleGalleryItem {
  id: string;
  title: string;
  category: string;
  url: string;
  defaultLocation: string;
  defaultDescription: string;
  defaultClothing: string;
  confidence: number;
}

export const SAMPLE_GALLERY_PHOTOS: SampleGalleryItem[] = [
  {
    id: 'sample-1',
    title: 'Individual at Transit Plaza',
    category: 'Possible Match: MP-44021 (Marcus Vance)',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    defaultLocation: 'Central District, 4th & Grand Ave (Transit Plaza)',
    defaultDescription: 'Individual seen near east transit terminal coffee kiosk. Appeared disoriented and checking departure signs.',
    defaultClothing: 'Charcoal windbreaker jacket, dark denim trousers, tan hiking shoes.',
    confidence: 87
  },
  {
    id: 'sample-2',
    title: 'Senior Citizen near Park Bench',
    category: 'Silver Alert Correlation: MP-39102',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    defaultLocation: 'Oakridge Community Park, North Path',
    defaultDescription: 'Elderly man resting near fountain pavilion. Wearing medical alert bracelet on right wrist.',
    defaultClothing: 'Navy cardigan sweater, beige corduroy pants, walking cane.',
    confidence: 82
  },
  {
    id: 'sample-3',
    title: 'Teenager near Library Entrance',
    category: 'Youth Advisory: MP-41088',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    defaultLocation: 'Downtown Public Library, South Steps',
    defaultDescription: 'Young woman seated with green canvas backpack matching bulletin description.',
    defaultClothing: 'Mustard yellow hoodie, black jeans, white high-top sneakers.',
    confidence: 76
  },
  {
    id: 'sample-4',
    title: 'Child near Playground Perimeter',
    category: 'Amber Alert Correlation: MP-45190',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    defaultLocation: 'Riverfront Recreational Trail, Gate 3',
    defaultDescription: 'Young boy walking slowly along path accompanied by small brown terrier dog.',
    defaultClothing: 'Teal puffer vest over grey long-sleeve tee, navy athletic shorts.',
    confidence: 91
  }
];

export interface CitizenAlertItem {
  id: string;
  title: string;
  type: 'Silver Alert' | 'Missing Child' | 'Vulnerable Adult';
  distance: string;
  lastSeenTime: string;
  location: string;
  image: string;
  age: number;
  urgency: 'High' | 'Medium';
}

export const ACTIVE_CITIZEN_ALERTS: CitizenAlertItem[] = [
  {
    id: 'ALT-901',
    title: 'Marcus Vance (34)',
    type: 'Vulnerable Adult',
    distance: '1.8 miles away',
    lastSeenTime: '2 hours ago',
    location: 'Central District Transit Corridor',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    age: 34,
    urgency: 'High'
  },
  {
    id: 'ALT-902',
    title: 'Arthur Pendelton (76)',
    type: 'Silver Alert',
    distance: '3.4 miles away',
    lastSeenTime: 'Yesterday, 6:00 PM',
    location: 'Pine Crest Assisted Living Grounds',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
    age: 76,
    urgency: 'High'
  }
];
