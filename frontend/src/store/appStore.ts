import { create } from 'zustand';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'price_drop' | 'stock' | 'sale' | 'alert' | 'system';
  read: boolean;
  createdAt: string;
}

interface Alert {
  id: string;
  productId: string;
  productName: string;
  targetPrice: number;
  currentPrice: number;
  status: 'active' | 'triggered' | 'expired';
  emailEnabled: boolean;
  createdAt: string;
}

interface TrackedProduct {
  id: string;
  productId: string;
  addedAt: string;
}

interface SearchHistory {
  id: string;
  query: string;
  timestamp: string;
}

interface Report {
  id: string;
  userId: string;
  userRole: 'user' | 'seller';
  userName: string;
  subject: string;
  category: string;
  description: string;
  status: 'pending' | 'in_progress' | 'resolved';
  createdAt: string;
  imageUrl?: string;
}

interface AppState {
  notifications: Notification[];
  alerts: Alert[];
  tracklist: TrackedProduct[];
  searchHistory: SearchHistory[];
  reports: Report[];
  sidebarOpen: boolean;
  
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  markNotificationRead: (id: string) => void;
  addAlert: (alert: Omit<Alert, 'id'>) => void;
  removeAlert: (id: string) => void;
  toggleAlertEmail: (id: string) => void;
  addToTracklist: (productId: string) => void;
  removeFromTracklist: (productId: string) => void;
  addSearchHistory: (query: string) => void;
  addReport: (report: Omit<Report, 'id' | 'createdAt' | 'status'>) => void;
  updateReportStatus: (id: string, status: Report['status']) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  notifications: [
    {
      id: '1',
      title: 'Price Drop Alert!',
      message: 'iPhone 15 Pro dropped by ₹5,000 on Amazon',
      type: 'price_drop',
      read: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Stock Update',
      message: 'Samsung Galaxy S24 is back in stock on Flipkart',
      type: 'stock',
      read: false,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: '3',
      title: 'Flash Sale Starting',
      message: 'Big Billion Days starting in 2 hours!',
      type: 'sale',
      read: true,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ],
  alerts: [
    {
      id: '1',
      productId: 'prod-1',
      productName: 'Apple iPhone 15 Pro',
      targetPrice: 115000,
      currentPrice: 124999,
      status: 'active',
      emailEnabled: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      productId: 'prod-2',
      productName: 'Sony WH-1000XM5',
      targetPrice: 25000,
      currentPrice: 26990,
      status: 'active',
      emailEnabled: false,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ],
  tracklist: [
    { id: '1', productId: 'prod-1', addedAt: new Date().toISOString() },
    { id: '2', productId: 'prod-2', addedAt: new Date(Date.now() - 86400000).toISOString() },
  ],
  searchHistory: [
    { id: '1', query: 'iPhone 15 Pro', timestamp: new Date().toISOString() },
    { id: '2', query: 'Sony headphones', timestamp: new Date(Date.now() - 86400000).toISOString() },
    { id: '3', query: 'MacBook Air M3', timestamp: new Date(Date.now() - 172800000).toISOString() },
  ],
  reports: [
    {
      id: '1',
      userId: 'user-1',
      userRole: 'user',
      userName: 'John Doe',
      subject: 'Incorrect pricing shown',
      category: 'Bug',
      description: 'The price shown for iPhone 15 Pro is different from the actual Amazon page.',
      status: 'pending',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      userId: 'seller-1',
      userRole: 'seller',
      userName: 'Tech Store',
      subject: 'Competition data not updating',
      category: 'Feature Request',
      description: 'The competitor prices are not updating in real-time.',
      status: 'in_progress',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ],
  sidebarOpen: true,

  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        { ...notification, id: Date.now().toString() },
        ...state.notifications,
      ],
    })),

  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),

  addAlert: (alert) =>
    set((state) => ({
      alerts: [...state.alerts, { ...alert, id: Date.now().toString() }],
    })),

  removeAlert: (id) =>
    set((state) => ({
      alerts: state.alerts.filter((a) => a.id !== id),
    })),

  toggleAlertEmail: (id) =>
    set((state) => ({
      alerts: state.alerts.map((a) =>
        a.id === id ? { ...a, emailEnabled: !a.emailEnabled } : a
      ),
    })),

  addToTracklist: (productId) =>
    set((state) => ({
      tracklist: [
        ...state.tracklist,
        { id: Date.now().toString(), productId, addedAt: new Date().toISOString() },
      ],
    })),

  removeFromTracklist: (productId) =>
    set((state) => ({
      tracklist: state.tracklist.filter((t) => t.productId !== productId),
    })),

  addSearchHistory: (query) =>
    set((state) => ({
      searchHistory: [
        { id: Date.now().toString(), query, timestamp: new Date().toISOString() },
        ...state.searchHistory.slice(0, 19),
      ],
    })),

  addReport: (report) =>
    set((state) => ({
      reports: [
        {
          ...report,
          id: Date.now().toString(),
          status: 'pending',
          createdAt: new Date().toISOString(),
        },
        ...state.reports,
      ],
    })),

  updateReportStatus: (id, status) =>
    set((state) => ({
      reports: state.reports.map((r) =>
        r.id === id ? { ...r, status } : r
      ),
    })),

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));
