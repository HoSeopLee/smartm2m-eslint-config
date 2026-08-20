// @preset: next @expect-rule: @next/next/no-async-client-component
'use client';

export default async function ClientPage() {
	return <main>Client page</main>;
}
