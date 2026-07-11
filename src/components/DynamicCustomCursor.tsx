"use client";

import dynamic from 'next/dynamic';

const DynamicCustomCursor = dynamic(() => import('./CustomCursor'), { ssr: false });

export default DynamicCustomCursor;
