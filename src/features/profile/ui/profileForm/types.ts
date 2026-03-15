export enum ApiRequestStatus {
  IDLE = 'Idle',
  LOADING = 'Loading',
  SUCCESS = 'Success',
  FAILED = 'Failed'
}

export interface TProfileFormUIProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  requestStatus: ApiRequestStatus;
  error?: string | null;
}
