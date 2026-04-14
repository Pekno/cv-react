import React from 'react';
import { Navigate } from 'react-router-dom';
import i18n from '../i18n/i18n';

/**
 * Redirects to the user's preferred language based on i18n detection
 * (path > localStorage > navigator fallback).
 */
export default function LanguageRedirect(): React.ReactElement {
  return <Navigate to={`/${i18n.language}`} replace />;
}
