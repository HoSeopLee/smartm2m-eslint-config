// @expect-rule: react-hooks/rules-of-hooks
import { useState } from 'react';

export const ConditionalHook = ({ enabled }: { enabled: boolean }) => {
	if (enabled) {
		useState(0);
	}

	return null;
};
