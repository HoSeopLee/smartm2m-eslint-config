// @expect-rule: react-hooks/exhaustive-deps
import { useEffect } from 'react';

export const EffectWithMissingDependency = ({ value }: { value: string }) => {
	useEffect(() => {
		console.log(value);
	}, []);

	return null;
};
