export default function ZoraEmbed(): React.ReactElement {
	return (
		<div className={'h-full w-full bg-white'}>
			<div style={{position: 'relative', width: '100%', paddingTop: 'calc(151.82% + 72px)'}}>
				<iframe 
					src={'https://zora.co/collect/base:0x39adafad9fde221725b975b4adae8b8f2dfa6d4b/1/embed'}
					style={{border: 0, backgroundColor: 'transparent', position: 'absolute', inset: 0}}
					width={'100%'}
					height={'100%'}
					sandbox={'allow-pointer-lock allow-same-origin allow-scripts allow-popups'}
					allowFullScreen />
			</div>
			<a 
				href={'https://zora.co/collect/base:0x39adafad9fde221725b975b4adae8b8f2dfa6d4b/1'}
				style={{padding: '12px', textDecoration: 'none', color: '#b3b3b3', fontFamily: "'Inter', system-ui", fontSize: '10px', lineHeight: '12px', fontStyle: 'normal', fontWeight: 400}}>
				{'yFu Comics First Edition on Zora'}
			</a>
		</div>
	);
}
