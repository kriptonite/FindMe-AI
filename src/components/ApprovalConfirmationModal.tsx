import React from 'react';
import { 
  ShieldAlert, 
  Send, 
  X, 
  Building2, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  FileText,
  UserCheck
} from 'lucide-react';
import { SightingCase } from '../types';

interface ApprovalConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  sightingCase: SightingCase;
  destinationAuthority: string;
  reviewerNotes: string;
}

export const ApprovalConfirmationModal: React.FC<ApprovalConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  sightingCase,
  destinationAuthority,
  reviewerNotes
}) => {
  if (!isOpen) return null;

  return (
    <div 
      id="approval-confirmation-modal-backdrop"
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
    >
      <div 
        id="approval-confirmation-modal"
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Send className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display">
                Approve and forward this sighting?
              </h3>
              <p className="text-xs text-slate-300">
                Authorized Emergency Dispatch Authorization
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="p-3.5 bg-blue-50/80 rounded-xl border border-blue-200/80 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
            <div className="text-xs text-blue-900 leading-relaxed">
              <span className="font-bold">Operational Impact:</span>{' '}
              This action will notify the appropriate local authority and initiate field verification units for Case <span className="font-mono font-bold">{sightingCase.id}</span>.
            </div>
          </div>

          <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-xs">
            <div className="flex justify-between pb-2 border-b border-slate-200">
              <span className="text-slate-500">Subject / Record:</span>
              <span className="font-semibold text-slate-900">
                {sightingCase.aiAnalysis.recordName} ({sightingCase.aiAnalysis.matchingRecordId})
              </span>
            </div>

            <div className="flex justify-between pb-2 border-b border-slate-200">
              <span className="text-slate-500">Destination Authority:</span>
              <span className="font-semibold text-slate-900 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-blue-600" />
                {destinationAuthority}
              </span>
            </div>

            <div className="flex justify-between pb-2 border-b border-slate-200">
              <span className="text-slate-500">AI Confidence:</span>
              <span className="font-mono font-bold text-blue-600">
                {sightingCase.aiConfidence}% Match
              </span>
            </div>

            <div>
              <span className="text-slate-500 block mb-1">Appended Reviewer Notes:</span>
              <p className="p-2 bg-white rounded-lg border border-slate-200 text-slate-700 italic">
                "{reviewerNotes || 'Biometric evidence verified and validated for response dispatch.'}"
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            id="cancel-approval-modal-btn"
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 bg-slate-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            id="confirm-approve-forward-btn"
            type="button"
            onClick={onConfirm}
            className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/30 rounded-lg transition-all flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Approve & Forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
