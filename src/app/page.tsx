'use client';

import React, { useState, useRef } from 'react';
import { RAW_ROSTER_CSV } from '@/lib/teamData';

interface GeneratedEmployeeOKR {
  employee_name: string;
  role_title: string;
  strategic_alignment: string;
  objectives: {
    title: string;
    key_results: {
      metric: string;
      baseline: number | string;
      target: number | string;
      unit: string;
    }[];
  }[];
}

interface GenerationResponse {
  status: 'success' | 'error';
  total: number;
  employees: GeneratedEmployeeOKR[];
  csvOutput: string;
  flowId: string;
  message?: string;
}

export default function OKRGeneratorApp() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [csvContent, setCsvContent] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingStep, setProcessingStep] = useState<string>('');
  const [result, setResult] = useState<GenerationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'table' | 'csv'>('table');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleFileUpload = (file: File) => {
    if (!file.name.endsWith('.csv') && file.type !== 'text/csv' && !file.name.endsWith('.txt')) {
      setError('Please upload a valid CSV file.');
      return;
    }
    setError(null);
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setCsvContent(text);
      showToast(`Loaded "${file.name}" (${(file.size / 1024).toFixed(1)} KB)`);
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleLoadSample = () => {
    setCsvContent(RAW_ROSTER_CSV);
    setFileName('sample_team_roster.csv');
    setError(null);
    showToast('Loaded 13-member Lamatic team roster CSV');
  };

  const handleGenerate = async () => {
    if (!csvContent.trim()) {
      setError('Please select or paste a CSV file first.');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setResult(null);

    try {
      setProcessingStep('1/3: Parsing employee roles & responsibilities...');
      await new Promise(r => setTimeout(r, 600));

      setProcessingStep('2/3: Querying Lamatic VectorDB & John Doerr synthesis on Groq 120B...');
      
      const res = await fetch('/api/generate-okrs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ csv_data: csvContent })
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.message || `Server returned HTTP ${res.status}`);
      }

      setProcessingStep('3/3: Formatting outcome metrics & compiling aligned CSV...');
      const data: GenerationResponse = await res.json();
      
      setResult(data);
      showToast(`Successfully generated OKRs for ${data.total} team members!`);
    } catch (err: any) {
      setError(err.message || 'Failed to generate OKRs via Lamatic Flow');
    } finally {
      setIsProcessing(false);
      setProcessingStep('');
    }
  };

  const handleDownloadCSV = () => {
    if (!result?.csvOutput) return;
    const blob = new Blob([result.csvOutput], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lamatic_okrs_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Downloaded generated OKRs CSV');
  };

  const handleCopyCSV = () => {
    if (!result?.csvOutput) return;
    navigator.clipboard.writeText(result.csvOutput);
    showToast('Copied CSV to clipboard');
  };

  const handleReset = () => {
    setResult(null);
    setCsvContent('');
    setFileName('');
    setError(null);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: theme === 'dark' ? '#0F0F11' : '#F8F9FA',
        color: theme === 'dark' ? '#EDEDED' : '#1A1A1A',
        fontFamily: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        transition: 'background-color 0.2s ease, color 0.2s ease'
      }}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            backgroundColor: theme === 'dark' ? '#1F2937' : '#111827',
            color: '#FFFFFF',
            padding: '12px 20px',
            borderRadius: 8,
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
            zIndex: 9999,
            fontSize: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            animation: 'fadeIn 0.2s ease'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="#10B981">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {toastMessage}
        </div>
      )}

      {/* Header Bar */}
      <header
        style={{
          borderBottom: theme === 'dark' ? '1px solid #262626' : '1px solid #E5E7EB',
          backgroundColor: theme === 'dark' ? '#141416' : '#FFFFFF',
          padding: '16px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 40
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              backgroundColor: '#E0372D',
              display: 'grid',
              placeItems: 'center',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: 16
            }}
          >
            L
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h1 style={{ fontSize: 17, fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>
                Lamatic AI · OKR Generator
              </h1>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  backgroundColor: theme === 'dark' ? '#2A2A2E' : '#EEF2F6',
                  color: theme === 'dark' ? '#9CA3AF' : '#4B5563',
                  padding: '2px 8px',
                  borderRadius: 6
                }}
              >
                Groq 120B · VectorDB
              </span>
            </div>
            <p style={{ fontSize: 12.5, color: theme === 'dark' ? '#888' : '#6B7280', margin: 0 }}>
              John Doerr outcome-based OKRs synthesized against Lamatic company context
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              border: theme === 'dark' ? '1px solid #333' : '1px solid #D1D5DB',
              backgroundColor: 'transparent',
              color: 'inherit',
              cursor: 'pointer',
              fontSize: 13,
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: 1120, margin: '0 auto', padding: '36px 24px 80px' }}>
        {!result ? (
          /* =========================================================================
             INPUT STATE: Upload & Configuration
             ========================================================================= */
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {/* Title / Description */}
            <div>
              <h2 style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 8px' }}>
                Generate Employee OKRs from CSV
              </h2>
              <p style={{ fontSize: 15, color: theme === 'dark' ? '#A3A3A3' : '#4B5563', margin: 0, lineHeight: 1.5 }}>
                Upload any team roster CSV (with name, role, department, responsibilities). The Lamatic AI Flow queries the company context in VectorDB and uses Groq 120B to generate qualitative objectives and quantitative key results for each team member.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div
                style={{
                  backgroundColor: theme === 'dark' ? '#3B1212' : '#FEE2E2',
                  border: '1px solid #EF4444',
                  borderRadius: 8,
                  padding: '12px 16px',
                  color: theme === 'dark' ? '#FCA5A5' : '#991B1B',
                  fontSize: 14
                }}
              >
                <b>Error:</b> {error}
              </div>
            )}

            {/* Upload Area Card */}
            <div
              style={{
                backgroundColor: theme === 'dark' ? '#161619' : '#FFFFFF',
                border: theme === 'dark' ? '1px solid #26262A' : '1px solid #E5E7EB',
                borderRadius: 14,
                padding: 28,
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}
            >
              {/* Drag & Drop Zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: isDragging
                    ? '2px dashed #E0372D'
                    : theme === 'dark' ? '2px dashed #333338' : '2px dashed #D1D5DB',
                  borderRadius: 12,
                  padding: '42px 24px',
                  textAlign: 'center',
                  backgroundColor: isDragging
                    ? (theme === 'dark' ? '#241515' : '#FFF5F5')
                    : (theme === 'dark' ? '#121214' : '#F9FAFB'),
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".csv,text/csv"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileUpload(e.target.files[0]);
                    }
                  }}
                  style={{ display: 'none' }}
                />

                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 10,
                    backgroundColor: theme === 'dark' ? '#26262B' : '#E5E7EB',
                    margin: '0 auto 14px',
                    display: 'grid',
                    placeItems: 'center'
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>

                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>
                  {fileName ? `Selected: ${fileName}` : 'Click to upload or drag and drop your employee CSV'}
                </div>
                <div style={{ fontSize: 13, color: theme === 'dark' ? '#888' : '#6B7280' }}>
                  Supports CSV format with first_name, last_name, role, department, responsibilities
                </div>
              </div>

              {/* Quick Actions Row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 12,
                  marginTop: 20
                }}
              >
                <button
                  type="button"
                  onClick={handleLoadSample}
                  style={{
                    backgroundColor: theme === 'dark' ? '#26262B' : '#F3F4F6',
                    color: theme === 'dark' ? '#D1D5DB' : '#374151',
                    border: '0',
                    padding: '8px 14px',
                    borderRadius: 6,
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                  Load Sample Lamatic Roster (13 Members)
                </button>

                {csvContent && (
                  <button
                    type="button"
                    onClick={() => { setCsvContent(''); setFileName(''); }}
                    style={{
                      backgroundColor: 'transparent',
                      color: theme === 'dark' ? '#9CA3AF' : '#6B7280',
                      border: '0',
                      fontSize: 13,
                      cursor: 'pointer'
                    }}
                  >
                    Clear CSV
                  </button>
                )}
              </div>

              {/* Editable CSV Textarea Preview */}
              {csvContent && (
                <div style={{ marginTop: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <label style={{ fontSize: 13, fontWeight: 600 }}>CSV Content Preview / Edit</label>
                    <span style={{ fontSize: 12, color: theme === 'dark' ? '#888' : '#6B7280' }}>
                      {csvContent.split('\n').filter(l => l.trim()).length} rows
                    </span>
                  </div>
                  <textarea
                    value={csvContent}
                    onChange={(e) => setCsvContent(e.target.value)}
                    rows={7}
                    style={{
                      width: '100%',
                      fontFamily: 'monospace',
                      fontSize: 12.5,
                      padding: 12,
                      borderRadius: 8,
                      border: theme === 'dark' ? '1px solid #333' : '1px solid #D1D5DB',
                      backgroundColor: theme === 'dark' ? '#101012' : '#F9FAFB',
                      color: 'inherit',
                      resize: 'vertical'
                    }}
                  />
                </div>
              )}

              {/* Submit Button */}
              <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  disabled={!csvContent.trim() || isProcessing}
                  onClick={handleGenerate}
                  style={{
                    backgroundColor: !csvContent.trim() || isProcessing ? '#9CA3AF' : '#E0372D',
                    color: '#FFFFFF',
                    border: '0',
                    borderRadius: 8,
                    padding: '12px 24px',
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: !csvContent.trim() || isProcessing ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    boxShadow: '0 2px 6px rgba(224, 55, 45, 0.3)',
                    transition: 'opacity 0.2s ease'
                  }}
                >
                  {isProcessing ? (
                    <>
                      <div
                        style={{
                          width: 16,
                          height: 16,
                          border: '2px solid #FFFFFF',
                          borderTopColor: 'transparent',
                          borderRadius: '50%',
                          animation: 'spin 0.8s linear infinite'
                        }}
                      />
                      Processing with Lamatic Flow...
                    </>
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                      </svg>
                      Run Lamatic Flow & Generate OKRs
                    </>
                  )}
                </button>
              </div>

              {/* Processing Progress Feedback */}
              {isProcessing && (
                <div
                  style={{
                    marginTop: 20,
                    padding: '14px 18px',
                    borderRadius: 8,
                    backgroundColor: theme === 'dark' ? '#1F1E24' : '#F3F4F6',
                    border: theme === 'dark' ? '1px solid #333' : '1px solid #E5E7EB',
                    fontSize: 13.5,
                    color: theme === 'dark' ? '#D1D5DB' : '#374151',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12
                  }}
                >
                  <div
                    style={{
                      width: 14,
                      height: 14,
                      border: '2px solid #E0372D',
                      borderTopColor: 'transparent',
                      borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite'
                    }}
                  />
                  <span>{processingStep}</span>
                </div>
              )}
            </div>

            {/* Info Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 16
              }}
            >
              <div
                style={{
                  backgroundColor: theme === 'dark' ? '#161619' : '#FFFFFF',
                  border: theme === 'dark' ? '1px solid #26262A' : '1px solid #E5E7EB',
                  borderRadius: 12,
                  padding: '18px 20px'
                }}
              >
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>
                  1. VectorDB Company Knowledge
                </div>
                <div style={{ fontSize: 13, color: theme === 'dark' ? '#888' : '#6B7280', lineHeight: 1.5 }}>
                  The backend RAG pipeline queries the <code>Lamatic_Company_Context</code> collection to ensure every employee OKR directly links to Lamatic Q4 pillars.
                </div>
              </div>

              <div
                style={{
                  backgroundColor: theme === 'dark' ? '#161619' : '#FFFFFF',
                  border: theme === 'dark' ? '1px solid #26262A' : '1px solid #E5E7EB',
                  borderRadius: 12,
                  padding: '18px 20px'
                }}
              >
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>
                  2. John Doerr OKR Standards
                </div>
                <div style={{ fontSize: 13, color: theme === 'dark' ? '#888' : '#6B7280', lineHeight: 1.5 }}>
                  Objectives are qualitative and inspiring. Key Results strictly follow the formula: <code>as measured by [Metric] from [Baseline] to [Target] [Unit]</code>.
                </div>
              </div>

              <div
                style={{
                  backgroundColor: theme === 'dark' ? '#161619' : '#FFFFFF',
                  border: theme === 'dark' ? '1px solid #26262A' : '1px solid #E5E7EB',
                  borderRadius: 12,
                  padding: '18px 20px'
                }}
              >
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>
                  3. Clean CSV & JSON Export
                </div>
                <div style={{ fontSize: 13, color: theme === 'dark' ? '#888' : '#6B7280', lineHeight: 1.5 }}>
                  The flow compiles the generated OKRs into standard CSV format ready for immediate download, import into HR tools, or sharing with the team.
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* =========================================================================
             OUTPUT STATE: Generated OKRs Returned from Lamatic Flow
             ========================================================================= */
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Header / Success Banner */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 16
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span
                    style={{
                      backgroundColor: '#10B981',
                      color: '#FFFFFF',
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: 13,
                      fontWeight: 700
                    }}
                  >
                    ✓
                  </span>
                  <h2 style={{ fontSize: 24, fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>
                    Generated OKRs for {result.total} Team Members
                  </h2>
                </div>
                <p style={{ fontSize: 13.5, color: theme === 'dark' ? '#888' : '#6B7280', margin: '4px 0 0 30px' }}>
                  Generated via Lamatic Flow (<code>{result.flowId.slice(0, 8)}...</code>) with Groq 120B and VectorDB
                </p>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <button
                  type="button"
                  onClick={handleDownloadCSV}
                  style={{
                    backgroundColor: '#E0372D',
                    color: '#FFFFFF',
                    border: '0',
                    borderRadius: 8,
                    padding: '10px 18px',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    boxShadow: '0 2px 5px rgba(224, 55, 45, 0.3)'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Download Generated CSV
                </button>

                <button
                  type="button"
                  onClick={handleCopyCSV}
                  style={{
                    backgroundColor: theme === 'dark' ? '#26262B' : '#F3F4F6',
                    color: 'inherit',
                    border: theme === 'dark' ? '1px solid #333' : '1px solid #D1D5DB',
                    borderRadius: 8,
                    padding: '10px 14px',
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                  Copy CSV
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  style={{
                    backgroundColor: 'transparent',
                    color: theme === 'dark' ? '#9CA3AF' : '#6B7280',
                    border: '0',
                    borderRadius: 8,
                    padding: '10px 12px',
                    fontSize: 13.5,
                    cursor: 'pointer'
                  }}
                >
                  Upload New CSV
                </button>
              </div>
            </div>

            {/* View Mode Toggle: Formatted Cards vs Raw CSV */}
            <div
              style={{
                display: 'flex',
                gap: 8,
                borderBottom: theme === 'dark' ? '1px solid #26262A' : '1px solid #E5E7EB',
                paddingBottom: 10
              }}
            >
              <button
                type="button"
                onClick={() => setActiveTab('table')}
                style={{
                  padding: '6px 14px',
                  borderRadius: 6,
                  border: '0',
                  backgroundColor: activeTab === 'table'
                    ? (theme === 'dark' ? '#26262A' : '#E5E7EB')
                    : 'transparent',
                  color: 'inherit',
                  fontWeight: activeTab === 'table' ? 600 : 400,
                  fontSize: 13.5,
                  cursor: 'pointer'
                }}
              >
                Structured OKRs Preview ({result.total})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('csv')}
                style={{
                  padding: '6px 14px',
                  borderRadius: 6,
                  border: '0',
                  backgroundColor: activeTab === 'csv'
                    ? (theme === 'dark' ? '#26262A' : '#E5E7EB')
                    : 'transparent',
                  color: 'inherit',
                  fontWeight: activeTab === 'csv' ? 600 : 400,
                  fontSize: 13.5,
                  cursor: 'pointer'
                }}
              >
                Raw CSV Export Preview
              </button>
            </div>

            {/* TAB 1: Structured Cards Preview */}
            {activeTab === 'table' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {result.employees.map((emp, empIdx) => (
                  <div
                    key={empIdx}
                    style={{
                      backgroundColor: theme === 'dark' ? '#161619' : '#FFFFFF',
                      border: theme === 'dark' ? '1px solid #26262A' : '1px solid #E5E7EB',
                      borderRadius: 12,
                      padding: '20px 24px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 16
                    }}
                  >
                    {/* Employee Profile Header */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ fontSize: 17, fontWeight: 700 }}>{emp.employee_name}</span>
                          <span
                            style={{
                              fontSize: 12,
                              fontWeight: 500,
                              backgroundColor: theme === 'dark' ? '#2A2A2E' : '#EEF2F6',
                              color: theme === 'dark' ? '#9CA3AF' : '#4B5563',
                              padding: '2px 8px',
                              borderRadius: 6
                            }}
                          >
                            {emp.role_title}
                          </span>
                        </div>
                        {emp.strategic_alignment && (
                          <div style={{ fontSize: 13, color: theme === 'dark' ? '#888' : '#6B7280', marginTop: 4 }}>
                            {emp.strategic_alignment}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Objectives & Key Results */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 14 }}>
                      {emp.objectives.map((obj, objIdx) => (
                        <div
                          key={objIdx}
                          style={{
                            backgroundColor: theme === 'dark' ? '#111113' : '#F9FAFB',
                            border: theme === 'dark' ? '1px solid #222226' : '1px solid #EEEDE9',
                            borderRadius: 10,
                            padding: '14px 16px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 10
                          }}
                        >
                          <div style={{ fontSize: 12, fontWeight: 600, color: '#E0372D', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            Objective {objIdx + 1}
                          </div>
                          <div style={{ fontSize: 14.5, fontWeight: 600, lineHeight: 1.35 }}>
                            {obj.title}
                          </div>

                          {/* Key Results */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
                            {obj.key_results.map((kr, krIdx) => (
                              <div
                                key={krIdx}
                                style={{
                                  fontSize: 13,
                                  backgroundColor: theme === 'dark' ? '#1A1A1E' : '#FFFFFF',
                                  border: theme === 'dark' ? '1px solid #2A2A30' : '1px solid #E5E7EB',
                                  borderRadius: 6,
                                  padding: '8px 10px',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: 4
                                }}
                              >
                                <div style={{ color: theme === 'dark' ? '#D1D5DB' : '#374151' }}>
                                  <b style={{ color: '#10B981' }}>KR {objIdx + 1}.{krIdx + 1}:</b> {kr.metric}
                                </div>
                                <div style={{ fontSize: 12, color: theme === 'dark' ? '#9CA3AF' : '#6B7280', fontVariantNumeric: 'tabular-nums' }}>
                                  Baseline: <b>{kr.baseline}</b> → Target: <b>{kr.target}</b> ({kr.unit})
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 2: Raw CSV Export Preview */}
            {activeTab === 'csv' && (
              <div
                style={{
                  backgroundColor: theme === 'dark' ? '#161619' : '#FFFFFF',
                  border: theme === 'dark' ? '1px solid #26262A' : '1px solid #E5E7EB',
                  borderRadius: 12,
                  padding: 20
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>Raw Output CSV Preview</span>
                  <button
                    type="button"
                    onClick={handleCopyCSV}
                    style={{
                      fontSize: 12.5,
                      padding: '4px 10px',
                      borderRadius: 6,
                      backgroundColor: theme === 'dark' ? '#26262B' : '#E5E7EB',
                      color: 'inherit',
                      border: 0,
                      cursor: 'pointer'
                    }}
                  >
                    Copy CSV Content
                  </button>
                </div>
                <textarea
                  readOnly
                  value={result.csvOutput}
                  rows={18}
                  style={{
                    width: '100%',
                    fontFamily: 'monospace',
                    fontSize: 12.5,
                    padding: 14,
                    borderRadius: 8,
                    border: theme === 'dark' ? '1px solid #333' : '1px solid #D1D5DB',
                    backgroundColor: theme === 'dark' ? '#101012' : '#F9FAFB',
                    color: 'inherit',
                    resize: 'vertical',
                    lineHeight: 1.5
                  }}
                />
              </div>
            )}
          </div>
        )}
      </main>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
