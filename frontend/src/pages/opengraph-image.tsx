import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Manglam Technical Agency — Technology That Transforms'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0A0A0A',
          padding: '72px 80px',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Violet glow */}
        <div
          style={{
            position: 'absolute',
            right: '-5%',
            top: '10%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 65%)',
          }}
        />

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, position: 'relative', zIndex: 10 }}>

          {/* Logo / name mark */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '48px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                backgroundColor: 'rgba(124,58,237,0.15)',
                border: '1px solid rgba(124,58,237,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#A78BFA',
                fontSize: '18px',
                fontWeight: 800,
              }}
            >
              M
            </div>
            <span style={{ color: '#888', fontSize: '13px', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              Manglam Technical Agency
            </span>
          </div>

          {/* Main headline */}
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
            <div
              style={{
                fontSize: '11px',
                color: '#A78BFA',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}
            >
              ✦ TECHNOLOGY THAT TRANSFORMS
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span
                style={{
                  fontSize: '88px',
                  fontWeight: 900,
                  color: '#FAFAFA',
                  lineHeight: 0.9,
                  letterSpacing: '-0.04em',
                  textTransform: 'uppercase',
                }}
              >
                DIGITAL
              </span>
              <span
                style={{
                  fontSize: '88px',
                  fontWeight: 900,
                  color: '#7C3AED',
                  lineHeight: 0.9,
                  letterSpacing: '-0.04em',
                  textTransform: 'uppercase',
                }}
              >
                EXCELLENCE.
              </span>
            </div>

            <p
              style={{
                marginTop: '28px',
                fontSize: '18px',
                color: '#888',
                lineHeight: 1.6,
                maxWidth: '560px',
              }}
            >
              Web development, AI automation, cybersecurity & digital operations for Indian businesses. Based in Rajasthan.
            </p>
          </div>

          {/* Footer strip */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '28px',
              borderTop: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div style={{ display: 'flex', gap: '32px' }}>
              {['Web Dev', 'AI Automation', 'Cybersecurity', 'Social Media'].map(s => (
                <span key={s} style={{ fontSize: '12px', color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {s}
                </span>
              ))}
            </div>
            <span style={{ fontSize: '12px', color: '#444', letterSpacing: '0.1em' }}>
              manglamtechnicalagency.com
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
