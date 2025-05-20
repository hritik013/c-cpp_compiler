/**
 * Type definitions for the compiler application
 */

export interface CompileRequest {
  code: string;
}

export interface CompileResponse {
  output: string;
  success: boolean;
  timestamp?: string;
}

export type CompileStatus = 'idle' | 'compiling' | 'success' | 'error';