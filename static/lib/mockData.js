// Mock data for browser-only dashboard

const mockRooms = [
  { id: 'room-001', name: 'Lecture Hall A', building: 'Science Building', capacity: 150, features: ['Projector', 'Whiteboard', 'Audio System'], status: 'available' },
  { id: 'room-002', name: 'Conference Room 101', building: 'Student Union', capacity: 25, features: ['Video Conference', 'Whiteboard'], status: 'occupied' },
  { id: 'room-003', name: 'Seminar Room B', building: 'Library', capacity: 40, features: ['Projector', 'Podium'], status: 'available' },
  { id: 'room-004', name: 'Lab 205', building: 'Engineering Hall', capacity: 30, features: ['Computers', 'Specialized Equipment'], status: 'maintenance' },
  { id: 'room-005', name: 'Auditorium', building: 'Arts Center', capacity: 300, features: ['Stage', 'Sound System', 'Lighting'], status: 'available' },
  { id: 'room-006', name: 'Classroom 302', building: 'Main Hall', capacity: 35, features: ['Projector', 'Whiteboard'], status: 'occupied' },
  { id: 'room-007', name: 'Study Room 4B', building: 'Library', capacity: 8, features: ['Whiteboard', 'Quiet Space'], status: 'available' },
  { id: 'room-008', name: 'Meeting Room C', building: 'Administration', capacity: 15, features: ['Video Conference'], status: 'available' },
];

const mockEvents = [
  { id: 'evt-001', title: 'Computer Science Department Meeting', description: 'Monthly faculty meeting', startDate: new Date(Date.now() + 86400000).toISOString(), endDate: new Date(Date.now() + 86400000 + 7200000).toISOString(), roomId: 'room-001', roomName: 'Lecture Hall A', organizer: 'Dr. Sarah Johnson', status: 'approved', attendees: 25 },
  { id: 'evt-002', title: 'Student Club Fair', description: 'Annual recruitment event', startDate: new Date(Date.now() + 172800000).toISOString(), endDate: new Date(Date.now() + 172800000 + 14400000).toISOString(), roomId: 'room-005', roomName: 'Auditorium', organizer: 'Student Activities Office', status: 'approved', attendees: 200 },
  { id: 'evt-003', title: 'Research Presentation: AI Ethics', description: 'Guest lecture on AI ethics', startDate: new Date(Date.now() + 43200000).toISOString(), endDate: new Date(Date.now() + 43200000 + 5400000).toISOString(), roomId: 'room-003', roomName: 'Seminar Room B', organizer: 'Prof. Michael Chen', status: 'pending', attendees: 35 },
  { id: 'evt-004', title: 'Alumni Networking Event', description: 'Networking for recent grads', startDate: new Date(Date.now() + 259200000).toISOString(), endDate: new Date(Date.now() + 259200000 + 10800000).toISOString(), roomId: 'room-002', roomName: 'Conference Room 101', organizer: 'Career Services', status: 'approved', attendees: 20 },
  { id: 'evt-005', title: 'Thesis Defense: Jane Smith', description: 'PhD defense on renewable energy', startDate: new Date(Date.now() + 345600000).toISOString(), endDate: new Date(Date.now() + 345600000 + 7200000).toISOString(), roomId: 'room-001', roomName: 'Lecture Hall A', organizer: 'Graduate Studies Office', status: 'pending', attendees: 50 },
  { id: 'evt-006', title: 'Board of Trustees Meeting', description: 'Quarterly board meeting', startDate: new Date(Date.now() + 518400000).toISOString(), endDate: new Date(Date.now() + 518400000 + 14400000).toISOString(), roomId: 'room-008', roomName: 'Meeting Room C', organizer: 'President\'s Office', status: 'approved', attendees: 12 },
];

const mockCourses = [
  { id: 'crs-001', code: 'CS 101', title: 'Introduction to Computer Science', instructor: 'Dr. Sarah Johnson', schedule: 'MWF 9:00-10:00 AM', roomId: 'room-001', roomName: 'Lecture Hall A', building: 'Science Building', credits: 3, enrollment: 142, capacity: 150, status: 'active' },
  { id: 'crs-002', code: 'MATH 201', title: 'Calculus II', instructor: 'Prof. Robert Williams', schedule: 'TTh 11:00-12:30 PM', roomId: 'room-006', roomName: 'Classroom 302', building: 'Main Hall', credits: 4, enrollment: 28, capacity: 35, status: 'active' },
  { id: 'crs-003', code: 'ENG 150', title: 'Academic Writing', instructor: 'Dr. Emily Parker', schedule: 'MWF 2:00-3:00 PM', roomId: 'room-003', roomName: 'Seminar Room B', building: 'Library', credits: 3, enrollment: 22, capacity: 40, status: 'active' },
  { id: 'crs-004', code: 'PHYS 301', title: 'Quantum Mechanics', instructor: 'Prof. David Lee', schedule: 'TTh 2:00-3:30 PM', roomId: 'room-004', roomName: 'Lab 205', building: 'Engineering Hall', credits: 4, enrollment: 18, capacity: 30, status: 'active' },
  { id: 'crs-005', code: 'ART 105', title: 'Introduction to Visual Arts', instructor: 'Prof. Maria Garcia', schedule: 'MW 4:00-6:00 PM', roomId: 'room-005', roomName: 'Auditorium', building: 'Arts Center', credits: 3, enrollment: 85, capacity: 300, status: 'active' },
  { id: 'crs-006', code: 'BUS 250', title: 'Marketing Principles', instructor: 'Dr. James Anderson', schedule: 'TTh 9:00-10:30 AM', roomId: 'room-002', roomName: 'Conference Room 101', building: 'Student Union', credits: 3, enrollment: 24, capacity: 25, status: 'active' },
  { id: 'crs-007', code: 'HIST 200', title: 'World History: 1900-Present', instructor: 'Prof. Lisa Thompson', schedule: 'MWF 11:00-12:00 PM', roomId: 'room-001', roomName: 'Lecture Hall A', building: 'Science Building', credits: 3, enrollment: 135, capacity: 150, status: 'active' },
  { id: 'crs-008', code: 'CHEM 101', title: 'General Chemistry I', instructor: 'Dr. Michael Brown', schedule: 'TTh 1:00-2:30 PM', roomId: 'room-004', roomName: 'Lab 205', building: 'Engineering Hall', credits: 4, enrollment: 26, capacity: 30, status: 'cancelled' },
];

function filterRooms(filters) {
  return mockRooms.filter((room) => {
    if (filters.status && room.status !== filters.status) return false;
    if (filters.building && !room.building.toLowerCase().includes(filters.building.toLowerCase())) return false;
    if (filters.room && !room.name.toLowerCase().includes(filters.room.toLowerCase())) return false;
    if (filters.query) {
      const query = filters.query.toLowerCase();
      const matches = room.name.toLowerCase().includes(query) || room.building.toLowerCase().includes(query) || room.features.some(f => f.toLowerCase().includes(query));
      if (!matches) return false;
    }
    return true;
  });
}

function filterEvents(filters) {
  return mockEvents.filter((event) => {
    if (filters.status && event.status !== filters.status) return false;
    if (filters.room && !event.roomName?.toLowerCase().includes(filters.room.toLowerCase())) return false;
    if (filters.query) {
      const query = filters.query.toLowerCase();
      const matches = event.title.toLowerCase().includes(query) || event.description?.toLowerCase().includes(query) || event.organizer.toLowerCase().includes(query);
      if (!matches) return false;
    }
    return true;
  });
}

function filterCourses(filters) {
  return mockCourses.filter((course) => {
    if (filters.status && course.status !== filters.status) return false;
    if (filters.room && !course.roomName?.toLowerCase().includes(filters.room.toLowerCase())) return false;
    if (filters.building && !course.building?.toLowerCase().includes(filters.building.toLowerCase())) return false;
    if (filters.query) {
      const query = filters.query.toLowerCase();
      const matches = course.code.toLowerCase().includes(query) || course.title.toLowerCase().includes(query) || course.instructor.toLowerCase().includes(query);
      if (!matches) return false;
    }
    return true;
  });
}
