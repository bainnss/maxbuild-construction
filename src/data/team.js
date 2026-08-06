export const team = [
  {
    id: 1,
    name: 'Alexander Grant',
    designation: 'Chief Executive Officer',
    experience: '28 years',
    specialisation: 'Strategic Leadership',
    linkedin: 'https://linkedin.com',
    bio: 'Alexander has led MaxBuild through two decades of transformative growth, establishing the firm as a trusted partner for landmark developments across North America.',
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    id: 2,
    name: 'Maya Chen',
    designation: 'Chief Operating Officer',
    experience: '22 years',
    specialisation: 'Operations & Delivery',
    linkedin: 'https://linkedin.com',
    bio: 'Maya oversees enterprise operations and project delivery excellence, ensuring every MaxBuild site meets the highest standards of safety, quality, and schedule integrity.',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    id: 3,
    name: 'James Okonkwo',
    designation: 'Chief Design Officer',
    experience: '20 years',
    specialisation: 'Architecture & Design',
    linkedin: 'https://linkedin.com',
    bio: 'James leads our design studio, blending architectural ambition with constructability to create spaces that endure and inspire.',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    id: 4,
    name: 'Sofia Ramirez',
    designation: 'VP of Engineering',
    experience: '18 years',
    specialisation: 'Structural Engineering',
    linkedin: 'https://linkedin.com',
    bio: 'Sofia brings deep structural expertise to complex high-rise, seismic, and long-span projects, mentoring the next generation of MaxBuild engineers.',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    id: 5,
    name: 'Daniel Park',
    designation: 'Director of Sustainability',
    experience: '15 years',
    specialisation: 'Green Building',
    linkedin: 'https://linkedin.com',
    bio: 'Daniel drives MaxBuild’s net-zero roadmap, embedding carbon reduction and wellness certification into every project from day one.',
    image:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    featured: false,
  },
  {
    id: 6,
    name: 'Priya Sharma',
    designation: 'Head of Project Controls',
    experience: '16 years',
    specialisation: 'Cost & Schedule',
    linkedin: 'https://linkedin.com',
    bio: 'Priya builds the systems that keep multi-year programs on track — from earned value analytics to real-time risk dashboards.',
    image:
      'https://images.unsplash.com/photo-1598550871331-59507e968479?auto=format&fit=crop&w=800&q=80',
    featured: false,
  },
  {
    id: 7,
    name: 'Marcus Webb',
    designation: 'VP of Safety',
    experience: '24 years',
    specialisation: 'Site Safety',
    linkedin: 'https://linkedin.com',
    bio: 'Marcus has shaped MaxBuild’s industry-leading safety culture, achieving multi-year zero lost-time records across major markets.',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    featured: false,
  },
  {
    id: 8,
    name: 'Elena Volkov',
    designation: 'Director of Client Experience',
    experience: '14 years',
    specialisation: 'Client Partnerships',
    linkedin: 'https://linkedin.com',
    bio: 'Elena ensures every client relationship is defined by clarity, responsiveness, and outcomes that exceed expectations.',
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    featured: false,
  },
]

export const getFeaturedTeam = () => team.filter((m) => m.featured)
