'use client';

import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  componentName?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary for animation-heavy components
 * Prevents animation failures from crashing the entire page
 * Compatible with all browsers: Chrome, Safari, Firefox, Edge, Opera
 */
export class AnimationErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.error(
        `[AnimationErrorBoundary] ${this.props.componentName || 'Animation'} crashed:`,
        error,
        errorInfo
      );
    }
    // In production, send to error tracking service (Sentry, LogRocket, etc.)
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI - gracefully degrade without the animation
      return this.props.fallback || (
        <div className="min-h-[200px] flex items-center justify-center">
          <p className="text-muted">
            {process.env.NODE_ENV === 'development' 
              ? `Animation error: ${this.state.error?.message}` 
              : 'Content loading...'}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Higher-order component to wrap any component with error boundary
 * Usage: export default withAnimationErrorBoundary(MyAnimatedComponent);
 */
export function withAnimationErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  componentName?: string,
  fallback?: ReactNode
) {
  return function WrappedComponent(props: P) {
    return (
      <AnimationErrorBoundary componentName={componentName} fallback={fallback}>
        <Component {...props} />
      </AnimationErrorBoundary>
    );
  };
}
