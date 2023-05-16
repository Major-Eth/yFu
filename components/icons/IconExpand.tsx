import	React							from	'react';

function	Icon({width = '16', height = '16', ...props}): React.ReactElement {
	return (
		<svg
			xmlns={'http://www.w3.org/2000/svg'}
			{...props}
			width={width}
			height={height}
			viewBox={'0 0 13.462 13.483'}>
			<g fill={'currentcolor'}>
				<path d={'M184.238.423c0-.017-.017-.034-.017-.051S184.2.338,184.2.321s-.017-.034-.034-.051c0-.017-.017-.017-.017-.034A.514.514,0,0,0,184.018.1C184,.1,184,.085,183.984.085c-.017-.017-.034-.017-.051-.034-.017,0-.034-.017-.051-.017s-.034-.017-.051-.017c-.034,0-.068-.017-.1-.017h-3.654a.51.51,0,0,0-.474.321.5.5,0,0,0,.118.558l1.472,1.472L176.151,7.41a.491.491,0,0,0,0,.711.49.49,0,0,0,.711,0L181.9,3.079l1.472,1.472a.487.487,0,0,0,.355.152.606.606,0,0,0,.186-.034.537.537,0,0,0,.321-.474V.524a.108.108,0,0,0,0-.1Z'} transform={'translate(-170.789)'}/>
				<path d={'M11.233,63.439a.5.5,0,0,0-.508.508v5.634H1.015V59.87H6.649a.508.508,0,1,0,0-1.015H.508A.5.5,0,0,0,0,59.363V70.088a.5.5,0,0,0,.508.508H11.233a.5.5,0,0,0,.508-.508V63.947a.5.5,0,0,0-.508-.507Z'} transform={'translate(0 -57.113)'}/>
			</g>
		</svg>
	);
}

export default Icon;
