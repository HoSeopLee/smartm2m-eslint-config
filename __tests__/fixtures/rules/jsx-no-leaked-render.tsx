// @expect-rule: react/jsx-no-leaked-render
// v1.0.4: {count && <X/>} 패턴에서 count=0일 때 "0"이 렌더되는 버그 차단
import React from 'react';

interface Props {
	list: Array<string>;
	count: number;
}

export const LeakedRender = ({ list, count }: Props) => {
	return (
		<div>
			{/* ❌ count=0일 때 "0"이 렌더됨 */}
			{count && <span>Count: {count}</span>}
			{/* ❌ list.length=0일 때 "0"이 렌더됨 */}
			{list.length && <ul>{list.map((v) => <li key={v}>{v}</li>)}</ul>}
		</div>
	);
};
