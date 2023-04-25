"use client";

import { Component } from "react";

import BasePanel from "./Sidebar/panels/BasePanel";

import type { ReactNode, ErrorInfo } from "react";

type Props = {
  children?: ReactNode;
  sidebarId:
    | "friends"
    | "notifications"
    | "notificationsAlert"
    | "playback"
    | "queue"
    | "none";
  title: string;
};

type State = {
  hasError: boolean;
};
/* Error Boundary for sidebar panels */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    const { hasError } = this.state;
    const { children } = this.props;
    const { title } = this.props;
    const { sidebarId } = this.props;
    return (
      <div>
        {hasError ? (
          <BasePanel title={title} sidebarId={sidebarId}>
            <h1 className="font-bold">Something went wrong!</h1>
          </BasePanel>
        ) : (
          children
        )}
      </div>
    );
  }
}

export default ErrorBoundary;
