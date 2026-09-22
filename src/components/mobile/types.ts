import React from 'react';
import { ShieldCheck } from 'lucide-react';

export type MobileScreen = 
  | 'splash'
  | 'login'
  | 'otp'
  | 'home'
  | 'report-capture'
  | 'report-details'
  | 'report-review'
  | 'confirmation'
  | 'report-status'
  | 'authority-notified'
  | 'my-reports'
  | 'notifications'
  | 'profile';

export interface CitizenReportFormState {
  photo: string;
  photoName?: string;
  location: string;
  coordinates: { lat: number; lng: number };
  dateTime: string;
  description: string;
  clothingDetails: string;
  needsImmediateAssistance: boolean;
  reporterVerified: boolean;
  generatedCaseId: string;
}

export interface CitizenUser {
  name: string;
  phone: string;
  email: string;
  isVerified: boolean;
  verificationDate: string;
  totalReports: number;
}
