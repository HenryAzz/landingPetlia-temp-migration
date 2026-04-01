import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

interface ContactScreenProps {
  preSelectedPlan?: string;
  onNavigateToJoinTeam?: () => void;
}

const PLANS = [
  { id: 'correspondencia', label: 'Correspondencia especial — $90.000/mes', bg: 'rgba(14,116,144,0.08)', border: 'rgba(14,116,144,0.3)' },
  { id: 'casual', label: 'Casualmente cotidiano — $180.000/mes', bg: 'rgba(244,63,94,0.08)', border: 'rgba(244,63,94,0.3)' },
  { id: 'diaria', label: 'Compañía diaria — $380.000/mes', bg: 'rgba(234,179,8,0.08)', border: 'rgba(234,179,8,0.3)' },
];

const TRUST_ITEMS = [
  { emoji: '🔒', title: 'Tu información', desc: 'Es 100% confidencial y protegida' },
  { emoji: '💛', title: 'Sin compromiso', desc: 'Es solo el primer paso para conocerte' },
  { emoji: '✓', title: 'Pago seguro', desc: 'Sin permanencia · Cancelá cuando quieras' },
];

const TERMS_CONTENT = {
  title: 'Términos y Condiciones',
  subtitle: 'CAMIL — Compañía Emocional Personalizada',
  lastUpdate: 'Junio 2025',
  sections: [
    { number: '1', title: 'Qué es CAMIL', text: 'CAMIL es un servicio de compañía emocional y entretenimiento conversacional brindado por una persona real, de forma exclusivamente virtual. No constituye terapia psicológica, servicio de citas, intermediación sentimental ni contenido para adultos de ningún tipo. Todas las interacciones son de carácter platónico.' },
    { number: '2', title: 'Quién puede contratar', text: 'El servicio está destinado exclusivamente a personas mayores de 23 años. CAMIL puede solicitar documentación que acredite la edad del usuario en cualquier momento.' },
    { number: '3', title: 'Cómo funciona', text: 'El usuario elige uno de los tres planes disponibles (Correspondencia Especial, Casualmente Cotidiano o Compañía Diaria), completa el formulario de inscripción y CAMIL lo contacta personalmente para coordinar el inicio del servicio. El contrato se perfecciona al confirmar el pago.' },
    { number: '4', title: 'Precios y pago', text: 'Los precios están expresados en pesos argentinos y se publican en el sitio web. El pago es mensual. Se aceptan transferencia bancaria, Mercado Pago y tarjetas de crédito/débito. CAMIL puede modificar los precios con un aviso previo de 15 días.' },
    { number: '5', title: 'Cancelación', text: 'El usuario puede cancelar en cualquier momento, sin permanencia, sin penalidad y sin necesidad de dar explicaciones. La cancelación toma efecto al finalizar el ciclo de facturación en curso.' },
    { number: '6', title: 'Garantía de satisfacción', text: 'Si el servicio no cumple las expectativas del usuario, puede solicitar el reembolso del 100% dentro de los primeros 7 días desde el inicio efectivo del servicio. Aplica una sola vez por usuario.' },
    { number: '7', title: 'Privacidad', text: 'Todas las conversaciones, cartas, llamadas y citas virtuales son confidenciales. CAMIL no comparte datos personales del usuario con terceros bajo ninguna circunstancia, salvo requerimiento judicial. Los datos financieros son gestionados exclusivamente por los procesadores de pago y no son almacenados por CAMIL. El usuario puede solicitar la eliminación de sus datos en cualquier momento.' },
    { number: '8', title: 'Límites del servicio', text: 'CAMIL es un servicio de entretenimiento y compañía emocional virtual. No reemplaza atención psicológica, médica o profesional. No ofrece ni acepta encuentros presenciales. No implica exclusividad afectiva ni compromiso emocional recíproco. Si CAMIL detecta señales de dependencia emocional perjudicial, puede limitar o finalizar el servicio para proteger a ambas partes.' },
    { number: '9', title: 'Conducta del usuario', text: 'El usuario se compromete a mantener un trato respetuoso en todo momento. Queda prohibido solicitar contenido sexual, erótico o íntimo; acosar, amenazar o agredir; intentar obtener la identidad o datos personales de la persona que brinda el servicio; grabar o difundir las interacciones sin autorización. El incumplimiento de cualquiera de estas normas dará lugar a la cancelación inmediata del servicio sin derecho a reembolso.' },
    { number: '10', title: 'Protección de la persona que presta el servicio', text: 'Por seguridad y privacidad, la identidad, ubicación y datos personales de la persona que brinda el servicio se mantienen en reserva. Intentar obtener esta información constituye una violación de estos términos.' },
    { number: '11', title: 'Servicio de regalo', text: 'Cuando el servicio se contrata como regalo, el contratante es responsable del pago. El beneficiario del regalo debe cumplir con el requisito de edad mínima de 23 años establecido en el punto 2; en caso contrario, el servicio no podrá prestarse y se aplicará la política de reembolso vigente. Las interacciones entre CAMIL y el beneficiario son confidenciales. Si el beneficiario no desea recibir el servicio, se aplicará la política de reembolso vigente.' },
    { number: '12', title: 'Cambio de plan', text: 'El usuario puede cambiar de plan en cualquier momento. El cambio se aplica en el siguiente ciclo de facturación, sujeto a disponibilidad de cupos.' },
    { number: '13', title: 'Responsabilidad', text: 'CAMIL no garantiza resultados específicos en el estado emocional del usuario. La responsabilidad total de CAMIL se limita al importe abonado en el último ciclo de facturación.' },
    { number: '14', title: 'Propiedad intelectual', text: 'Las cartas, mensajes, audios y todo contenido creado por CAMIL en el marco del servicio son obras originales protegidas por derecho de autor. El usuario puede conservarlas para uso personal pero no puede reproducirlas, publicarlas ni distribuirlas sin autorización expresa de CAMIL.' },
    { number: '15', title: 'Modificaciones', text: 'CAMIL puede modificar estos términos con un aviso previo de 15 días. El uso continuado del servicio después de la modificación implica aceptación.' },
    { number: '16', title: 'Legislación aplicable', text: 'Estos términos se rigen por las leyes de la República Argentina. Para cualquier controversia, las partes se someten a los tribunales competentes de la Ciudad Autónoma de Buenos Aires (CABA).' },
  ],
};

const PRIVACY_CONTENT = {
  title: 'Política de Privacidad',
  subtitle: 'CAMIL — Compañía Emocional Personalizada',
  lastUpdate: 'Junio 2025',
  sections: [
    { number: '1', title: 'Introducción', text: 'En CAMIL valoramos y protegemos la privacidad de nuestros usuarios. Esta Política de Privacidad explica cómo recopilamos, utilizamos y protegemos la información personal proporcionada por quienes utilizan nuestro servicio. El tratamiento de los datos personales se realiza de conformidad con la Ley N° 25.326 de Protección de Datos Personales de la República Argentina y sus normas complementarias.' },
    { number: '2', title: 'Responsable del tratamiento', text: 'CAMIL, con domicilio en la Ciudad Autónoma de Buenos Aires, Argentina, es responsable del tratamiento de los datos personales recopilados a través de su sitio web y en el marco de la prestación del servicio.' },
    { number: '3', title: 'Datos que recopilamos', text: 'Recopilamos los datos que nos proporcionás voluntariamente al completar el formulario de inscripción: nombre o apodo, correo electrónico, número de teléfono o WhatsApp, edad o rango etario, gustos, intereses, preferencias y fechas significativas. También recopilamos información que compartís durante las interacciones propias del servicio.' },
    { number: '4', title: 'Para qué usamos tus datos', text: 'Utilizamos tus datos exclusivamente para: personalizar tu experiencia de compañía, coordinar cartas, mensajes, llamadas y citas virtuales, recordar tus momentos especiales y preferencias, gestionar la facturación y medios de pago, y comunicarte novedades o cambios relevantes sobre el servicio.' },
    { number: '5', title: 'Confidencialidad de las interacciones', text: 'Todas las conversaciones, cartas, llamadas y citas virtuales son estrictamente confidenciales. CAMIL no divulga, publica, comparte ni utiliza el contenido de las interacciones con fines publicitarios, estadísticos ni de ninguna otra índole.' },
    { number: '6', title: 'Compartición con terceros', text: 'CAMIL no comparte tus datos personales con terceros bajo ninguna circunstancia, salvo requerimiento judicial o de autoridad competente. Los datos financieros son gestionados exclusivamente por los procesadores de pago (entidades bancarias, Mercado Pago) y no son almacenados por CAMIL.' },
    { number: '7', title: 'Seguridad de los datos', text: 'Implementamos medidas de seguridad razonables para proteger tus datos personales contra accesos no autorizados, alteración, divulgación o destrucción. Tu información financiera es tratada con los más altos estándares de seguridad a través de los procesadores de pago certificados.' },
    { number: '8', title: 'Tus derechos', text: 'Podés acceder, rectificar, actualizar y solicitar la eliminación de tus datos personales en cualquier momento, comunicándote a través de nuestros canales de contacto. Atenderemos tu solicitud dentro de los 10 días hábiles siguientes.' },
    { number: '9', title: 'Conservación de datos', text: 'En caso de cancelación del servicio, conservaremos tus datos durante un plazo máximo de 6 meses con fines administrativos y de cumplimiento legal. Transcurrido ese plazo, serán eliminados definitivamente. Podés solicitar la eliminación anticipada en cualquier momento posterior a la cancelación.' },
    { number: '10', title: 'Modificaciones a esta política', text: 'CAMIL puede modificar esta Política de Privacidad con un aviso previo de 15 días. El uso continuado del servicio después de la modificación implica aceptación de los nuevos términos.' },
    { number: '11', title: 'Legislación aplicable', text: 'El tratamiento de tus datos personales se rige por la Ley N° 25.326 de Protección de Datos Personales de la República Argentina y sus normas complementarias.' },
  ],
};

const REFUND_CONTENT = {
  title: 'Política de Reembolso',
  subtitle: 'CAMIL — Compañía Emocional Personalizada',
  lastUpdate: 'Junio 2025',
  sections: [
    { number: '1', title: 'Garantía de satisfacción', text: 'Si el servicio no cumple las expectativas del usuario, puede solicitar el reembolso del 100% del importe abonado correspondiente al primer ciclo de facturación. Esta garantía aplica una sola vez por usuario.' },
    { number: '2', title: 'Plazo para solicitar el reembolso', text: 'El usuario dispone de los primeros 7 (siete) días corridos desde el inicio efectivo del servicio (primera carta, mensaje o llamada recibida) para solicitar el reembolso. Transcurrido este plazo, no se aceptarán solicitudes bajo la garantía de satisfacción.' },
    { number: '3', title: 'Cómo solicitar el reembolso', text: 'Para solicitar el reembolso, el usuario debe comunicarse a través de los canales de contacto oficiales de CAMIL: por correo electrónico a contacto@camilvirtual.com o por WhatsApp al +54 11 3188-8538. No es necesario dar explicaciones ni justificar la solicitud.' },
    { number: '4', title: 'Procesamiento del reembolso', text: 'Una vez recibida la solicitud, CAMIL procesará el reembolso dentro de los 10 (diez) días hábiles siguientes. El reembolso se realizará utilizando el mismo medio de pago empleado por el usuario para la contratación, salvo acuerdo distinto entre las partes.' },
    { number: '5', title: 'Efecto del reembolso sobre el servicio', text: 'El ejercicio de la garantía de satisfacción implica la finalización inmediata del servicio. Una vez procesado el reembolso, el usuario dejará de recibir cartas, mensajes, llamadas y cualquier otra prestación incluida en su plan.' },
    { number: '6', title: 'Cancelación sin reembolso', text: 'Fuera del plazo de los primeros 7 días, el usuario puede cancelar su suscripción en cualquier momento sin permanencia ni penalidad. La cancelación toma efecto al finalizar el ciclo de facturación en curso. No se realizan reembolsos proporcionales por los días no utilizados del ciclo en curso.' },
    { number: '7', title: 'Reembolso por incumplimiento de CAMIL', text: 'Si CAMIL no puede prestar el servicio contratado por causa que le sea directamente imputable, el usuario tendrá derecho al reembolso proporcional correspondiente al período no prestado. Esto incluye situaciones en las que CAMIL interrumpa el servicio de forma unilateral sin causa justificada.' },
    { number: '8', title: 'Cobros duplicados o erróneos', text: 'En caso de cobro duplicado o erróneo verificable, CAMIL procederá al reembolso íntegro del monto cobrado de más dentro de los 10 (diez) días hábiles siguientes a la detección o comunicación del error.' },
    { number: '9', title: 'Servicio de regalo', text: 'Cuando el servicio fue contratado como regalo y el beneficiario no desea recibirlo, o no cumple con el requisito de edad mínima de 23 años, el contratante podrá solicitar el reembolso completo dentro de los 7 días posteriores al inicio del servicio. Las mismas condiciones de la garantía de satisfacción aplican en este caso.' },
    { number: '10', title: 'Exclusiones de reembolso', text: 'No procederá reembolso alguno cuando el servicio haya sido cancelado por incumplimiento del usuario de los Términos y Condiciones, incluyendo pero sin limitarse a: conductas irrespetuosas, solicitud de contenido sexual o íntimo, acoso, amenazas, o intento de obtener la identidad de la persona que brinda el servicio.' },
    { number: '11', title: 'Cambio de plan', text: 'El cambio de plan no genera derecho a reembolso por la diferencia del ciclo en curso. Si el usuario cambia a un plan de menor precio, el nuevo precio se aplicará a partir del siguiente ciclo de facturación. Si cambia a uno de mayor precio, se podrá acordar el pago de la diferencia proporcional o el precio completo del nuevo plan desde el siguiente ciclo.' },
    { number: '12', title: 'Contacto para reembolsos', text: 'Todas las solicitudes de reembolso deben dirigirse a los canales oficiales de CAMIL. Responderá en un plazo máximo de 24 horas hábiles para confirmar la recepción de la solicitud y coordinar el proceso.' },
  ],
};

const CONTACT_INFO = {
  email: 'contacto@camilvirtual.com',
  whatsapp: '+54 11 3188-8538',
};

type LegalPopupType = 'terms' | 'privacy' | 'refund' | null;

const ContactScreen = ({ preSelectedPlan, onNavigateToJoinTeam }: ContactScreenProps) => {
  const [contactMethod, setContactMethod] = useState<'telefono' | 'correo'>('telefono');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [legalPopup, setLegalPopup] = useState<LegalPopupType>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (legalPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [legalPopup]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (preSelectedPlan) setSelectedPlan(preSelectedPlan);
  }, [preSelectedPlan]);

  useEffect(() => {
    if (hasAnimated) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const planTexto = PLANS.find(p => p.id === selectedPlan)?.label || selectedPlan || 'No especificado';
    const ahora = new Date();
    const fecha = ahora.toLocaleDateString('es-AR', { day: '2-digit', month: 'long', year: 'numeric' });
    const hora = ahora.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });

    try {
      await emailjs.send('service_xq4kynq', 'template_ltem9eo', {
        nombre: formData.get('nombre'),
        contacto: formData.get('contacto'),
        plan: planTexto,
        mensaje: formData.get('mensaje') || 'No dejó mensaje adicional',
        fecha, hora,
      }, 'DyVuk6RLny9SZJDPT');
      setSubmitted(true);
      form.reset();
      setSelectedPlan('');
    } catch (error) {
      console.error('Error al enviar:', error);
      alert('Hubo un error al enviar el formulario. Por favor intentá de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setSelectedPlan('');
  };

  const getLegalContent = () => {
    switch (legalPopup) {
      case 'terms': return TERMS_CONTENT;
      case 'privacy': return PRIVACY_CONTENT;
      case 'refund': return REFUND_CONTENT;
      default: return TERMS_CONTENT;
    }
  };

  const getLegalIcon = () => {
    switch (legalPopup) {
      case 'terms': return '📋';
      case 'privacy': return '🔒';
      case 'refund': return '💰';
      default: return '📋';
    }
  };

  const renderLegalPopup = () => {
    if (!legalPopup) return null;
    const content = getLegalContent();

    return (
      <div className="ct-legal-wrapper" onClick={() => setLegalPopup(null)}>
        <div className="ct-legal-popup" onClick={(e) => e.stopPropagation()}>
          <div className="ct-legal-popup-inner">
            <div className="ct-legal-header">
              <div className="ct-legal-header-left">
                <div className="ct-legal-header-icon">{getLegalIcon()}</div>
                <div className="ct-legal-header-text">
                  <h2 className="ct-legal-title">{content.title}</h2>
                  <span className="ct-legal-update">Última actualización: {content.lastUpdate}</span>
                </div>
              </div>
              <button className="ct-legal-close" onClick={() => setLegalPopup(null)} aria-label="Cerrar">
                <span className="ct-legal-close-icon">✕</span>
              </button>
            </div>

            <div className="ct-legal-nav">
              <button className={`ct-legal-nav-pill ${legalPopup === 'terms' ? 'ct-legal-nav-pill--active' : ''}`} onClick={() => setLegalPopup('terms')}>Términos</button>
              <button className={`ct-legal-nav-pill ${legalPopup === 'privacy' ? 'ct-legal-nav-pill--active' : ''}`} onClick={() => setLegalPopup('privacy')}>Privacidad</button>
              <button className={`ct-legal-nav-pill ${legalPopup === 'refund' ? 'ct-legal-nav-pill--active' : ''}`} onClick={() => setLegalPopup('refund')}>Reembolso</button>
            </div>

            <div className="ct-legal-content" key={legalPopup}>
              <div className="ct-legal-doc-subtitle">{content.subtitle}</div>
              {content.sections.map((section) => (
                <div key={`${legalPopup}-${section.number}`} className="ct-legal-section">
                  <div className="ct-legal-section-header">
                    <span className="ct-legal-section-number">{section.number}</span>
                    <h3 className="ct-legal-section-title">{section.title}</h3>
                  </div>
                  <p className="ct-legal-section-text">{section.text}</p>
                </div>
              ))}
              <div className="ct-legal-contact">
                <div className="ct-legal-contact-title">Contacto</div>
                <div className="ct-legal-contact-row">
                  <span className="ct-legal-contact-icon">📧</span>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="ct-legal-contact-value ct-legal-contact-link">{CONTACT_INFO.email}</a>
                </div>
                <div className="ct-legal-contact-row">
                  <span className="ct-legal-contact-icon">📱</span>
                  <a href="https://wa.link/nrb6ix" target="_blank" rel="noopener noreferrer" className="ct-legal-contact-value ct-legal-contact-link">{CONTACT_INFO.whatsapp}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const a = hasAnimated;

  return (
    <section ref={sectionRef} id="contacto" className="cnt-section">
      <style>{`
        /* ══════════════════════════════
           CONTACT LEGAL POPUP (ct- prefixed)
        ══════════════════════════════ */
        .ct-legal-wrapper {
          position: fixed;
          inset: 0;
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          animation: ctLegalFadeIn 0.3s ease both;
        }

        .ct-legal-popup {
          position: relative;
          width: 94%;
          max-width: 680px;
          max-height: 88vh;
          max-height: 88dvh;
          display: flex;
          flex-direction: column;
          background: #FAFAF8;
          border-radius: 24px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.2), 0 8px 20px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          animation: ctLegalSlideUp 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .ct-legal-popup-inner {
          display: flex;
          flex-direction: column;
          height: 100%;
          max-height: 88vh;
          max-height: 88dvh;
        }

        .ct-legal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 28px 32px 20px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          flex-shrink: 0;
          background: #FAFAF8;
        }

        .ct-legal-header-left { display: flex; align-items: center; gap: 14px; min-width: 0; }
        .ct-legal-header-icon { font-size: 28px; line-height: 1; flex-shrink: 0; }
        .ct-legal-header-text { display: flex; flex-direction: column; gap: 2px; min-width: 0; }

        .ct-legal-title {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: 20px;
          color: #1C1C1E;
          margin: 0;
          line-height: 1.3;
          letter-spacing: -0.02em;
        }

        .ct-legal-update {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: 12px;
          color: #999;
          letter-spacing: 0.02em;
        }

        .ct-legal-close {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(0, 0, 0, 0.06);
          cursor: pointer;
          transition: all 0.25s ease;
          flex-shrink: 0;
          -webkit-tap-highlight-color: transparent;
        }

        .ct-legal-close:hover { background: rgba(0, 0, 0, 0.1); transform: scale(1.08); }
        .ct-legal-close-icon { font-size: 14px; color: #555; line-height: 1; font-family: 'Poppins', sans-serif; font-weight: 400; }

        .ct-legal-nav {
          display: flex;
          gap: 8px;
          padding: 16px 32px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.04);
          flex-shrink: 0;
          background: #FAFAF8;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .ct-legal-nav::-webkit-scrollbar { display: none; }

        .ct-legal-nav-pill {
          padding: 8px 18px;
          border-radius: 50px;
          background: transparent;
          border: 1px solid rgba(0, 0, 0, 0.1);
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          font-size: 12px;
          color: #777;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
          -webkit-tap-highlight-color: transparent;
        }

        .ct-legal-nav-pill:hover { border-color: rgba(180, 140, 110, 0.4); color: #555; background: rgba(180, 140, 110, 0.05); }

        .ct-legal-nav-pill--active {
          background: linear-gradient(135deg, rgba(180, 140, 110, 0.15), rgba(180, 140, 110, 0.06));
          border-color: rgba(180, 140, 110, 0.35);
          color: #8B6914;
        }

        .ct-legal-content {
          flex: 1;
          overflow-y: auto;
          padding: 24px 32px 32px;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          background: #FAFAF8;
        }

        .ct-legal-content::-webkit-scrollbar { width: 5px; }
        .ct-legal-content::-webkit-scrollbar-track { background: transparent; }
        .ct-legal-content::-webkit-scrollbar-thumb { background: rgba(0, 0, 0, 0.1); border-radius: 10px; }
        .ct-legal-content::-webkit-scrollbar-thumb:hover { background: rgba(0, 0, 0, 0.2); }

        .ct-legal-doc-subtitle {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: 12px;
          color: #AAA;
          letter-spacing: 0.04em;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.04);
        }

        .ct-legal-section { margin-bottom: 22px; padding-bottom: 22px; border-bottom: 1px solid rgba(0, 0, 0, 0.04); }
        .ct-legal-section:last-of-type { border-bottom: none; margin-bottom: 28px; }

        .ct-legal-section-header { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }

        .ct-legal-section-number {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(180, 140, 110, 0.15), rgba(180, 140, 110, 0.06));
          border: 1px solid rgba(180, 140, 110, 0.2);
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 12px;
          color: #8B6914;
          flex-shrink: 0;
        }

        .ct-legal-section-title { font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 15px; color: #2A2A2A; margin: 0; line-height: 1.4; }
        .ct-legal-section-text { font-family: 'Poppins', sans-serif; font-weight: 400; font-size: 14px; color: #555; line-height: 1.75; margin: 0; padding-left: 40px; }

        .ct-legal-contact {
          background: linear-gradient(135deg, rgba(180, 140, 110, 0.08), rgba(180, 140, 110, 0.03));
          border: 1px solid rgba(180, 140, 110, 0.15);
          border-radius: 16px;
          padding: 22px 24px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .ct-legal-contact-title { font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 14px; color: #8B6914; margin-bottom: 2px; }
        .ct-legal-contact-row { display: flex; align-items: center; gap: 10px; }
        .ct-legal-contact-icon { font-size: 16px; line-height: 1; flex-shrink: 0; }
        .ct-legal-contact-value { font-family: 'Poppins', sans-serif; font-weight: 400; font-size: 14px; color: #555; }
        .ct-legal-contact-link { text-decoration: none; color: #555; transition: color 0.2s ease; }
        .ct-legal-contact-link:hover { color: #8B6914; }

        @keyframes ctLegalFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes ctLegalSlideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 1024px) {
          .ct-legal-popup { width: 96%; max-width: 600px; max-height: 85vh; max-height: 85dvh; border-radius: 22px; }
          .ct-legal-popup-inner { max-height: 85vh; max-height: 85dvh; }
          .ct-legal-header { padding: 24px 28px 18px; }
          .ct-legal-nav { padding: 14px 28px; }
          .ct-legal-content { padding: 22px 28px 28px; }
        }

        @media (max-width: 768px) {
          .ct-legal-wrapper { align-items: flex-end; }
          .ct-legal-popup { width: 100%; max-width: 100%; max-height: 95vh; max-height: 95dvh; border-radius: 24px 24px 0 0; animation: ctLegalSlideUpMobile 0.4s cubic-bezier(0.22, 1, 0.36, 1) both; }
          .ct-legal-popup-inner { max-height: 95vh; max-height: 95dvh; }
          .ct-legal-header { padding: 20px 22px 16px; }
          .ct-legal-header-icon { font-size: 24px; }
          .ct-legal-title { font-size: 17px; }
          .ct-legal-update { font-size: 11px; }
          .ct-legal-close { width: 34px; height: 34px; }
          .ct-legal-close-icon { font-size: 13px; }
          .ct-legal-nav { padding: 12px 22px; gap: 6px; }
          .ct-legal-nav-pill { font-size: 11px; padding: 7px 14px; }
          .ct-legal-content { padding: 20px 22px 28px; }
          .ct-legal-doc-subtitle { font-size: 11px; margin-bottom: 20px; }
          .ct-legal-section { margin-bottom: 18px; padding-bottom: 18px; }
          .ct-legal-section-number { width: 26px; height: 26px; font-size: 11px; }
          .ct-legal-section-title { font-size: 14px; }
          .ct-legal-section-text { font-size: 13px; padding-left: 38px; line-height: 1.7; }
          .ct-legal-contact { padding: 18px 20px; border-radius: 14px; }
          .ct-legal-contact-title { font-size: 13px; }
          .ct-legal-contact-value { font-size: 13px; }
          @keyframes ctLegalSlideUpMobile { from { opacity: 0; transform: translateY(100%); } to { opacity: 1; transform: translateY(0); } }
        }

        @media (max-width: 480px) {
          .ct-legal-header { padding: 18px 20px 14px; }
          .ct-legal-header-left { gap: 10px; }
          .ct-legal-header-icon { font-size: 22px; }
          .ct-legal-title { font-size: 16px; }
          .ct-legal-nav { padding: 10px 20px; }
          .ct-legal-nav-pill { font-size: 10.5px; padding: 6px 12px; }
          .ct-legal-content { padding: 18px 20px 24px; }
          .ct-legal-doc-subtitle { font-size: 10px; }
          .ct-legal-section-header { gap: 10px; }
          .ct-legal-section-number { width: 24px; height: 24px; font-size: 10px; }
          .ct-legal-section-title { font-size: 13.5px; }
          .ct-legal-section-text { font-size: 12.5px; padding-left: 34px; }
          .ct-legal-contact { padding: 16px 18px; border-radius: 12px; gap: 8px; }
          .ct-legal-contact-title { font-size: 12px; }
          .ct-legal-contact-icon { font-size: 14px; }
          .ct-legal-contact-value { font-size: 12px; }
        }

        @media (max-width: 400px) {
          .ct-legal-header { padding: 16px 18px 12px; }
          .ct-legal-title { font-size: 15px; }
          .ct-legal-nav { padding: 10px 18px; }
          .ct-legal-content { padding: 16px 18px 22px; }
          .ct-legal-section-text { padding-left: 0; margin-top: 6px; }
          .ct-legal-section-header { gap: 8px; }
        }

        @media (max-width: 340px) {
          .ct-legal-header { padding: 14px 16px 10px; }
          .ct-legal-header-icon { font-size: 20px; }
          .ct-legal-title { font-size: 14px; }
          .ct-legal-update { font-size: 10px; }
          .ct-legal-close { width: 30px; height: 30px; }
          .ct-legal-close-icon { font-size: 12px; }
          .ct-legal-nav { padding: 8px 16px; gap: 5px; }
          .ct-legal-nav-pill { font-size: 10px; padding: 5px 10px; }
          .ct-legal-content { padding: 14px 16px 20px; }
          .ct-legal-doc-subtitle { font-size: 9.5px; margin-bottom: 16px; padding-bottom: 12px; }
          .ct-legal-section { margin-bottom: 14px; padding-bottom: 14px; }
          .ct-legal-section-number { width: 22px; height: 22px; font-size: 9px; }
          .ct-legal-section-title { font-size: 12.5px; }
          .ct-legal-section-text { font-size: 11.5px; padding-left: 0; }
          .ct-legal-contact { padding: 14px 14px; border-radius: 10px; }
          .ct-legal-contact-title { font-size: 11px; }
          .ct-legal-contact-value { font-size: 11px; }
        }

        /* ══════════════════════════════
           CONTACT SECTION STYLES
        ══════════════════════════════ */
        .cnt-section {
          position: relative;
          width: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          padding-bottom: clamp(32px, 3.2vw, 56px);
        }

        .cnt-bg { position: absolute; inset: 0; z-index: 0; display: flex; align-items: center; justify-content: center; }
        .cnt-bg img { width: 140%; height: 140%; min-width: 140%; min-height: 140%; object-fit: cover; }

        .cnt-wave { position: relative; width: 100%; pointer-events: none; z-index: 2; line-height: 0; flex-shrink: 0; margin-bottom: -1px; }
        .cnt-wave svg { width: 100%; height: clamp(45px, 5.5vw, 75px); display: block; }

        .cnt-deco { position: absolute; pointer-events: none; z-index: 4; opacity: 0; }
        .cnt-deco img { width: 100%; height: 100%; object-fit: contain; }

        @keyframes cntF1 { 0%, 100% { transform: translateY(0) rotate(0deg); } 25% { transform: translateY(-8px) rotate(2deg); } 50% { transform: translateY(-4px) rotate(-1.5deg); } 75% { transform: translateY(-6px) rotate(0.5deg); } }
        @keyframes cntF2 { 0%, 100% { transform: translateY(0) rotate(0deg); } 30% { transform: translateY(-6px) rotate(-2deg); } 60% { transform: translateY(-10px) rotate(1.5deg); } 85% { transform: translateY(-3px) rotate(-0.5deg); } }
        @keyframes cntF3 { 0%, 100% { transform: translateY(0) scale(1) rotate(0deg); } 25% { transform: translateY(-7px) scale(1.03) rotate(1.5deg); } 50% { transform: translateY(-4px) scale(1) rotate(-1deg); } 75% { transform: translateY(-6px) scale(1.02) rotate(0.5deg); } }
        @keyframes cntF4 { 0%, 100% { transform: translateY(0) rotate(0deg); } 20% { transform: translateY(-5px) rotate(-1.5deg); } 50% { transform: translateY(-9px) rotate(2deg); } 80% { transform: translateY(-3px) rotate(-0.5deg); } }

        .cnt-fl-1 { animation: cntF1 4s ease-in-out infinite; }
        .cnt-fl-2 { animation: cntF2 4.6s ease-in-out infinite 0.5s; }
        .cnt-fl-3 { animation: cntF3 3.8s ease-in-out infinite 1s; }
        .cnt-fl-4 { animation: cntF4 4.3s ease-in-out infinite 0.3s; }

        .cnt-layout { position: relative; z-index: 10; flex: 1; display: flex; width: 100%; max-width: 1320px; margin: 0 auto; align-items: center; gap: clamp(20px, 2vw, 40px); padding: clamp(48px, 7vw, 100px) clamp(24px, 4vw, 60px); box-sizing: border-box; }
        .cnt-left { width: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; position: relative; }
        .cnt-left-inner { display: flex; flex-direction: column; align-items: flex-start; justify-content: center; width: 100%; position: relative; }
        .cnt-right { width: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .cnt-right-inner { width: 100%; display: flex; flex-direction: column; align-items: center; gap: clamp(14px, 1.2vw, 20px); }

        .cnt-accent { width: 42px; height: 2.5px; border-radius: 2px; background: linear-gradient(90deg, #F9DDA3, rgba(249,221,163,0.15)); margin-bottom: clamp(14px, 1.4vw, 22px); opacity: 0; }
        .cnt-label { font-family: 'Poppins', sans-serif; font-weight: 600; font-size: clamp(12px, 1vw, 13px); letter-spacing: 0.22em; color: rgba(255,255,255,0.5); text-transform: uppercase; margin-bottom: clamp(14px, 1.4vw, 22px); opacity: 0; }
        .cnt-title { font-family: 'Poppins', sans-serif; font-weight: 600; font-size: clamp(60px, 2.8vw, 42px); line-height: 1.25; color: #FFFFFF; letter-spacing: -0.02em; margin: 0 0 clamp(14px, 1.2vw, 22px); text-shadow: 0 2px 16px rgba(0,0,0,0.2); opacity: 0; }
        .cnt-title-light { font-weight: 300; font-style: italic; color: rgba(255,255,255,0.85); }
        .cnt-desc { font-family: 'Poppins', sans-serif; font-weight: 400; font-size: clamp(13px, 1.1vw, 17px); color: rgba(255,255,255,0.7); line-height: 1.7; margin: 0 0 clamp(20px, 2vw, 32px); max-width: clamp(400px, 26vw, 400px); opacity: 0; }

        .cnt-trust-grid { display: flex; flex-direction: column; gap: clamp(10px, 0.9vw, 14px); width: 100%; max-width: clamp(280px, 28vw, 420px); }
        .cnt-trust-card { display: flex; align-items: center; gap: clamp(12px, 1vw, 16px); padding: clamp(14px, 1.2vw, 20px); border-radius: clamp(14px, 1.2vw, 18px); background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); transition: all 0.35s cubic-bezier(0.4,0,0.2,1); cursor: default; opacity: 0; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }
        .cnt-trust-card:hover { background: rgba(249,221,163,0.08); border-color: rgba(249,221,163,0.2); transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.15); }
        .cnt-trust-card-icon { display: flex; align-items: center; justify-content: center; font-size: clamp(20px, 1.6vw, 26px); flex-shrink: 0; line-height: 1; }
        .cnt-trust-card-text { display: flex; flex-direction: column; gap: clamp(2px, 0.25vw, 4px); min-width: 0; }
        .cnt-trust-card-title { font-family: 'Poppins', sans-serif; font-weight: 600; font-size: clamp(13px, 1vw, 15px); color: rgba(255,255,255,0.92); letter-spacing: 0.01em; }
        .cnt-trust-card-desc { font-family: 'Poppins', sans-serif; font-weight: 400; font-size: clamp(11.5px, 0.85vw, 13px); color: rgba(255,255,255,0.45); line-height: 1.45; letter-spacing: 0.01em; }

        .cnt-form-card { display: flex; flex-direction: column; border-radius: clamp(18px, 1.6vw, 26px); background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.04)); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.1); width: 100%; max-width: 580px; padding: clamp(20px, 2vw, 32px) clamp(22px, 2.5vw, 36px); gap: clamp(12px, 1vw, 16px); opacity: 0; }
        .cnt-form-title { font-family: 'Poppins', sans-serif; font-weight: 600; font-size: clamp(17px, 1.4vw, 24px); color: #F9DDA3; margin: 0 0 clamp(2px, 0.3vw, 6px); }

        .cnt-row-2 { display: grid; grid-template-columns: 1fr 1fr; column-gap: clamp(10px, 0.8vw, 16px); row-gap: clamp(4px, 0.35vw, 6px); }
        .cnt-row-2 > .cnt-field { display: grid; grid-row: span 2; grid-template-rows: subgrid; }
        .cnt-label-row { display: flex; align-items: center; gap: clamp(6px, 0.5vw, 10px); min-height: 0; }
        .cnt-field { display: flex; flex-direction: column; gap: clamp(4px, 0.35vw, 6px); }
        .cnt-field-label { font-family: 'Poppins', sans-serif; font-weight: 400; font-size: clamp(12px, 0.88vw, 14px); color: rgba(255,255,255,0.6); }
        .cnt-input { width: 100%; padding: clamp(10px, 0.7vw, 13px) clamp(14px, 1.1vw, 18px); border-radius: clamp(10px, 0.9vw, 14px); border: 1px solid rgba(255,255,255,0.25); background: rgba(255,255,255,0.08); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); color: #FFFFFF; font-family: 'Poppins', sans-serif; font-weight: 400; font-size: clamp(13px, 0.95vw, 15px); letter-spacing: 0.02em; outline: none; transition: all 0.3s ease; box-sizing: border-box; }
        .cnt-input::placeholder { color: rgba(255,255,255,0.4); }
        .cnt-input:focus { border-color: #F9DDA3; background: rgba(255,255,255,0.12); box-shadow: 0 0 0 3px rgba(249,221,163,0.15); }
        .cnt-textarea { width: 100%; padding: clamp(10px, 0.7vw, 13px) clamp(14px, 1.1vw, 18px); border-radius: clamp(10px, 0.9vw, 14px); border: 1px solid rgba(255,255,255,0.25); background: rgba(255,255,255,0.08); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); color: #FFFFFF; font-family: 'Poppins', sans-serif; font-weight: 400; font-size: clamp(13px, 0.95vw, 15px); outline: none; resize: none; min-height: clamp(60px, 4.5vw, 80px); transition: all 0.3s ease; box-sizing: border-box; }
        .cnt-textarea::placeholder { color: rgba(255,255,255,0.4); }
        .cnt-textarea:focus { border-color: #F9DDA3; background: rgba(255,255,255,0.12); box-shadow: 0 0 0 3px rgba(249,221,163,0.15); }

        .cnt-methods { display: flex; gap: clamp(6px, 0.5vw, 10px); }
        .cnt-method { padding: clamp(5px, 0.35vw, 8px) clamp(14px, 1.1vw, 20px); border-radius: 50px; font-family: 'Poppins', sans-serif; font-weight: 500; font-size: clamp(12px, 0.85vw, 14px); cursor: pointer; transition: all 0.3s ease; -webkit-tap-highlight-color: transparent; }
        .cnt-method:hover { background: rgba(255,255,255,0.15); }

        .cnt-plans { display: flex; flex-direction: column; gap: clamp(4px, 0.35vw, 7px); }
        .cnt-plan { display: flex; align-items: center; gap: clamp(7px, 0.6vw, 12px); padding: clamp(8px, 0.5vw, 11px) clamp(12px, 1vw, 16px); border-radius: clamp(9px, 0.8vw, 12px); cursor: pointer; transition: all 0.3s ease; -webkit-tap-highlight-color: transparent; text-align: left; }
        .cnt-plan:hover { transform: translateY(-1px); }
        .cnt-plan-radio { width: clamp(16px, 1.2vw, 20px); height: clamp(16px, 1.2vw, 20px); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: border-color 0.3s ease; }
        .cnt-plan-dot { width: clamp(7px, 0.5vw, 9px); height: clamp(7px, 0.5vw, 9px); border-radius: 50%; background: #FFFFFF; }
        .cnt-plan-label { font-family: 'Poppins', sans-serif; font-size: clamp(12px, 0.88vw, 14px); transition: all 0.3s ease; }

        .cnt-optional { font-family: 'Poppins', sans-serif; font-weight: 400; font-size: clamp(10px, 0.7vw, 12px); color: rgba(255,255,255,0.35); font-style: italic; }
        .cnt-legal { font-family: 'Poppins', sans-serif; font-weight: 400; font-size: clamp(10px, 0.72vw, 12px); color: rgba(255,255,255,0.35); line-height: 1.6; margin: 0; }
        .cnt-legal span { color: rgba(249,221,163,0.6); cursor: pointer; text-decoration: underline; transition: color 0.2s ease; }
        .cnt-legal span:hover { color: rgba(249,221,163,0.9); }

        .cnt-submit { position: relative; overflow: hidden; width: 100%; padding: clamp(11px, 0.75vw, 15px) 0; border-radius: 50px; background: linear-gradient(135deg, #F9DDA3, #f0c96e); border: 1px solid rgba(255,255,255,0.3); color: #5A4520; font-family: 'Poppins', sans-serif; font-weight: 600; font-size: clamp(13px, 1vw, 16px); display: flex; align-items: center; justify-content: center; gap: clamp(6px, 0.5vw, 10px); cursor: pointer; box-shadow: 0 4px 20px rgba(249,221,163,0.2); transition: all 0.35s cubic-bezier(0.4,0,0.2,1); -webkit-tap-highlight-color: transparent; }
        .cnt-submit::before { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent); transition: left 0.5s ease; }
        .cnt-submit:hover::before { left: 100%; }
        .cnt-submit:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(249,221,163,0.3); }
        .cnt-submit:active { transform: scale(0.97); }
        .cnt-submit:disabled { opacity: 0.7; cursor: not-allowed; transform: none !important; }

        @keyframes cntSpin { to { transform: rotate(360deg); } }
        .cnt-spinner { width: clamp(16px, 1.2vw, 20px); height: clamp(16px, 1.2vw, 20px); border: 2px solid rgba(90,69,32,0.2); border-top-color: #5A4520; border-radius: 50%; animation: cntSpin 1s linear infinite; }

        .cnt-success { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; border-radius: clamp(18px, 1.6vw, 26px); background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.04)); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.08); width: 100%; max-width: 580px; padding: clamp(32px, 3.5vw, 56px) clamp(22px, 2.5vw, 40px); gap: clamp(14px, 1.4vw, 22px); }
        .cnt-success-circle { width: clamp(56px, 5vw, 80px); height: clamp(56px, 5vw, 80px); border-radius: 50%; background: linear-gradient(135deg, rgba(249,221,163,0.3), rgba(246,158,130,0.2)); border: 2px solid rgba(249,221,163,0.4); display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 25px rgba(249,221,163,0.15); }
        .cnt-success-emoji { font-size: clamp(26px, 2.6vw, 40px); }
        .cnt-success-title { font-family: 'Poppins', sans-serif; font-weight: 600; font-size: clamp(17px, 1.6vw, 24px); color: #F9DDA3; margin: 0; }
        .cnt-success-text { font-family: 'Poppins', sans-serif; font-weight: 400; font-size: clamp(12.5px, 1.1vw, 16px); color: rgba(255,255,255,0.7); line-height: 1.7; margin: 0; max-width: clamp(260px, 26vw, 380px); }
        .cnt-success-divider { width: clamp(40px, 5vw, 70px); height: 2px; border-radius: 2px; background: linear-gradient(90deg, transparent, rgba(249,221,163,0.4), transparent); }
        .cnt-success-reset { padding: clamp(8px, 0.6vw, 12px) clamp(20px, 1.5vw, 28px); border-radius: 50px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.2); color: rgba(255,255,255,0.6); font-family: 'Poppins', sans-serif; font-weight: 400; font-size: clamp(11px, 0.88vw, 14px); cursor: pointer; transition: all 0.3s ease; }
        .cnt-success-reset:hover { background: rgba(255,255,255,0.15); color: #F9DDA3; border-color: rgba(249,221,163,0.4); }

        @keyframes cntHeartPop { 0% { opacity: 0; transform: scale(0) rotate(-15deg); } 50% { opacity: 1; transform: scale(1.2) rotate(5deg); } 70% { transform: scale(0.95) rotate(-2deg); } 100% { opacity: 1; transform: scale(1) rotate(0deg); } }
        @keyframes cntSuccessFade { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
        .cnt-s-heart { animation: cntHeartPop 0.7s cubic-bezier(0.22,1,0.36,1) forwards; }
        .cnt-s-1 { opacity: 0; animation: cntSuccessFade 0.6s cubic-bezier(0.22,1,0.36,1) 0.25s forwards; }
        .cnt-s-2 { opacity: 0; animation: cntSuccessFade 0.6s cubic-bezier(0.22,1,0.36,1) 0.4s forwards; }
        .cnt-s-3 { opacity: 0; animation: cntSuccessFade 0.5s cubic-bezier(0.22,1,0.36,1) 0.6s forwards; }

        @keyframes cntUp { 0% { opacity: 0; transform: translateY(28px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes cntSlide { 0% { opacity: 0; transform: translateX(-40px); } 100% { opacity: 1; transform: translateX(0); } }
        @keyframes cntScale { 0% { opacity: 0; transform: translateY(40px) scale(0.95); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes cntPop { 0% { opacity: 0; transform: scale(0) rotate(-10deg); } 60% { opacity: 1; transform: scale(1.08) rotate(3deg); } 100% { opacity: 1; transform: scale(1) rotate(0deg); } }
        @keyframes cntCardIn { 0% { opacity: 0; transform: translateY(18px) scale(0.96); } 100% { opacity: 1; transform: translateY(0) scale(1); } }

        .cnt-a-up { animation: cntUp 0.8s cubic-bezier(0.22,1,0.36,1) both; }
        .cnt-a-slide { animation: cntSlide 0.85s cubic-bezier(0.22,1,0.36,1) both; }
        .cnt-a-scale { animation: cntScale 0.9s cubic-bezier(0.22,1,0.36,1) both; }
        .cnt-a-pop { animation: cntPop 0.55s cubic-bezier(0.34,1.56,0.64,1) both; }
        .cnt-a-card { animation: cntCardIn 0.65s cubic-bezier(0.22,1,0.36,1) both; }

        @media (max-width: 1024px) {
          .cnt-layout { flex-direction: column; align-items: center; gap: 40px; padding: clamp(48px, 7vw, 80px) clamp(24px, 5vw, 60px); }
          .cnt-left { width: 100%; }
          .cnt-left-inner { align-items: center; text-align: center; }
          .cnt-right { width: 100%; }
          .cnt-right-inner { padding: 0; }
          .cnt-desc { max-width: 460px; }
          .cnt-form-card { max-width: 560px; }
          .cnt-success { max-width: 560px; }
          .cnt-trust-grid { max-width: 480px; }
          .cnt-trust-card { text-align: left; }
          .cnt-deco { display: none !important; }
          .cnt-a-slide { animation-name: cntUp; }
        }

        @media (max-width: 768px) {
          .cnt-section { padding-bottom: 50px; }
          .cnt-layout { gap: 32px; padding: clamp(36px, 5vw, 56px) 24px; }
          .cnt-title { font-size: clamp(26px, 6vw, 34px); }
          .cnt-desc { font-size: 14px; max-width: 380px; }
          .cnt-row-2 { grid-template-columns: 1fr; gap: clamp(10px, 0.8vw, 16px); }
          .cnt-row-2 > .cnt-field { display: flex; flex-direction: column; gap: clamp(4px, 0.35vw, 6px); grid-row: auto; }
          .cnt-form-card { max-width: 100%; padding: 26px; border-radius: 20px; }
          .cnt-success { max-width: 100%; padding: 40px 24px; border-radius: 20px; }
          .cnt-submit { border-radius: 14px; }
          .cnt-trust-card { padding: 14px; gap: 12px; }
          .cnt-trust-card-icon { font-size: 22px; }
          .cnt-trust-card-title { font-size: 13px; }
          .cnt-trust-card-desc { font-size: 11.5px; }
        }

        @media (max-width: 540px) {
          .cnt-section { padding-bottom: 44px; }
          .cnt-layout { gap: 26px; padding: 36px 20px; }
          .cnt-title { font-size: clamp(24px, 5.5vw, 28px); }
          .cnt-label { font-size: 10px; }
          .cnt-desc { font-size: 13px; max-width: 340px; }
          .cnt-form-card { padding: 22px 18px; border-radius: 18px; }
          .cnt-trust-grid { max-width: 340px; }
        }

        @media (max-width: 400px) {
          .cnt-section { padding-bottom: 40px; }
          .cnt-layout { gap: 22px; padding: 28px 18px; }
          .cnt-accent { width: 30px; margin-bottom: 12px; }
          .cnt-label { margin-bottom: 12px; font-size: 9.5px; }
          .cnt-title { font-size: 22px; margin-bottom: 10px; }
          .cnt-desc { font-size: 12.5px; max-width: 300px; margin-bottom: 16px; }
          .cnt-trust-card { padding: 12px; gap: 10px; border-radius: 12px; }
          .cnt-trust-card-icon { font-size: 20px; }
          .cnt-trust-card-title { font-size: 12.5px; }
          .cnt-trust-card-desc { font-size: 11px; }
          .cnt-form-card { padding: 20px 16px; gap: 14px; border-radius: 16px; }
          .cnt-form-title { font-size: 16px; }
          .cnt-submit { padding: 12px 0; font-size: 13px; }
          .cnt-success { padding: 32px 18px; border-radius: 16px; }
        }

        @media (max-width: 340px) {
          .cnt-section { padding-bottom: 36px; }
          .cnt-layout { gap: 20px; padding: 24px 14px; }
          .cnt-title { font-size: 20px; }
          .cnt-desc { font-size: 12px; }
          .cnt-trust-card { padding: 10px; }
          .cnt-trust-card-icon { font-size: 18px; }
          .cnt-trust-card-title { font-size: 12px; }
          .cnt-trust-card-desc { font-size: 10.5px; }
          .cnt-form-card { padding: 18px 14px; gap: 12px; border-radius: 14px; }
          .cnt-form-title { font-size: 15px; }
          .cnt-submit { padding: 11px 0; font-size: 12.5px; }
          .cnt-success { padding: 28px 14px; border-radius: 14px; }
        }
      `}</style>

      <div className="cnt-bg">
        <img src="/fondoazul.png" alt="" />
      </div>

      <div className="cnt-wave">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ transform: 'rotate(180deg)' }}>
          <path d="M0,40 Q180,0 360,25 Q540,50 720,20 Q900,0 1080,30 Q1260,55 1440,15 L1440,120 L0,120 Z" fill="#F9DDA3" />
        </svg>
      </div>

      <div className={`cnt-deco ${a ? 'cnt-a-pop' : ''}`} style={{ left: '3vw', top: '22%', width: 'clamp(28px, 3.2vw, 50px)', height: 'clamp(28px, 3.2vw, 50px)', animationDelay: '0.6s' }}>
        <img src="/corazonderecha.png" alt="" className={mounted ? 'cnt-fl-1' : ''} style={{ opacity: 0.7 }} />
      </div>
      <div className={`cnt-deco ${a ? 'cnt-a-pop' : ''}`} style={{ left: '6vw', top: '45%', width: 'clamp(22px, 2.5vw, 40px)', height: 'clamp(22px, 2.5vw, 40px)', animationDelay: '0.75s' }}>
        <img src="/carta.png" alt="" className={mounted ? 'cnt-fl-2' : ''} style={{ opacity: 0.6 }} />
      </div>
      <div className={`cnt-deco ${a ? 'cnt-a-pop' : ''}`} style={{ left: '2.5vw', top: '65%', width: 'clamp(24px, 2.8vw, 44px)', height: 'clamp(24px, 2.8vw, 44px)', animationDelay: '0.9s' }}>
        <img src="/corazonizquierda.png" alt="" className={mounted ? 'cnt-fl-3' : ''} style={{ opacity: 0.65 }} />
      </div>
      <div className={`cnt-deco ${a ? 'cnt-a-pop' : ''}`} style={{ left: '5.5vw', top: '82%', width: 'clamp(20px, 2.2vw, 36px)', height: 'clamp(20px, 2.2vw, 36px)', animationDelay: '1.05s' }}>
        <img src="/carta.png" alt="" className={mounted ? 'cnt-fl-4' : ''} style={{ opacity: 0.55 }} />
      </div>

      <div className="cnt-layout">
        <div className="cnt-left">
          <div className="cnt-left-inner">
            <div className={`cnt-accent ${a ? 'cnt-a-slide' : ''}`} style={{ animationDelay: '0.1s' }} />
            <span className={`cnt-label ${a ? 'cnt-a-slide' : ''}`} style={{ animationDelay: '0.2s' }}>COMENZÁ AHORA</span>
            <h2 className={`cnt-title ${a ? 'cnt-a-slide' : ''}`} style={{ animationDelay: '0.3s' }}>
              <span className="cnt-title-light">Tu primer paso</span><br />hacia algo especial
            </h2>
            <p className={`cnt-desc ${a ? 'cnt-a-slide' : ''}`} style={{ animationDelay: '0.42s' }}>
              Completá el formulario y Camil se pondrá en contacto a la brevedad para conocerte y comenzar.
            </p>
            <div className="cnt-trust-grid">
              {TRUST_ITEMS.map((item, i) => (
                <div key={i} className={`cnt-trust-card ${a ? 'cnt-a-card' : ''}`} style={{ animationDelay: `${0.5 + i * 0.1}s` }}>
                  <div className="cnt-trust-card-icon">{item.emoji}</div>
                  <div className="cnt-trust-card-text">
                    <span className="cnt-trust-card-title">{item.title}</span>
                    <span className="cnt-trust-card-desc">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="cnt-right">
          <div className="cnt-right-inner">
            {!submitted ? (
              <form onSubmit={handleSubmit} className={`cnt-form-card ${a ? 'cnt-a-scale' : ''}`} style={{ animationDelay: '0.3s' }}>
                <h3 className="cnt-form-title">Solicitar vínculo</h3>

                <div className="cnt-row-2">
                  <div className="cnt-field">
                    <div className="cnt-label-row">
                      <label className="cnt-field-label" style={{ margin: 0 }}>Nombre *</label>
                    </div>
                    <input type="text" name="nombre" className="cnt-input" placeholder="¿Cómo te llamás?" required />
                  </div>
                  <div className="cnt-field">
                    <div className="cnt-label-row">
                      <label className="cnt-field-label" style={{ margin: 0 }}>Contacto *</label>
                      <div className="cnt-methods">
                        {(['telefono', 'correo'] as const).map((m) => (
                          <button key={m} type="button" className="cnt-method" onClick={() => setContactMethod(m)} style={{
                            border: `1px solid ${contactMethod === m ? '#F9DDA3' : 'rgba(255,255,255,0.2)'}`,
                            backgroundColor: contactMethod === m ? 'rgba(249,221,163,0.15)' : 'transparent',
                            color: contactMethod === m ? '#F9DDA3' : 'rgba(255,255,255,0.5)',
                          }}>
                            {m === 'telefono' ? '📞' : '✉️'}
                          </button>
                        ))}
                      </div>
                    </div>
                    <input type={contactMethod === 'telefono' ? 'tel' : 'email'} name="contacto" className="cnt-input" placeholder={contactMethod === 'telefono' ? '+54 11 1234-5678' : 'Tu correo electrónico'} required />
                  </div>
                </div>

                <div className="cnt-field">
                  <label className="cnt-field-label">Plan de interés *</label>
                  <div className="cnt-plans">
                    {PLANS.map((plan) => (
                      <button key={plan.id} type="button" className="cnt-plan" onClick={() => setSelectedPlan(plan.id)} style={{
                        border: `1.5px solid ${selectedPlan === plan.id ? plan.border : 'rgba(255,255,255,0.15)'}`,
                        backgroundColor: selectedPlan === plan.id ? plan.bg : 'rgba(255,255,255,0.05)',
                      }}>
                        <div className="cnt-plan-radio" style={{ border: `2px solid ${selectedPlan === plan.id ? '#FFFFFF' : 'rgba(255,255,255,0.35)'}` }}>
                          {selectedPlan === plan.id && <div className="cnt-plan-dot" />}
                        </div>
                        <span className="cnt-plan-label" style={{
                          fontWeight: selectedPlan === plan.id ? 500 : 400,
                          color: selectedPlan === plan.id ? '#FFFFFF' : 'rgba(255,255,255,0.7)',
                        }}>
                          {plan.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="cnt-field">
                  <label className="cnt-field-label">Contanos un poco sobre vos <span className="cnt-optional">(opcional)</span></label>
                  <textarea name="mensaje" className="cnt-textarea" placeholder="¿Qué te motivó a escribirnos?" />
                </div>

                <p className="cnt-legal">
                  Al enviar aceptás nuestra{' '}
                  <span onClick={() => setLegalPopup('privacy')}>política de privacidad</span>{' '}
                  y{' '}
                  <span onClick={() => setLegalPopup('terms')}>términos y condiciones</span>.
                </p>

                <button type="submit" className="cnt-submit" disabled={isSubmitting}>
                  {isSubmitting ? (<><div className="cnt-spinner" />Enviando...</>) : 'Enviar solicitud'}
                </button>
              </form>
            ) : (
              <div className="cnt-success">
                <div className="cnt-success-circle cnt-s-heart">
                  <span className="cnt-success-emoji">💛</span>
                </div>
                <h3 className="cnt-success-title cnt-s-1">¡Solicitud enviada!</h3>
                <p className="cnt-success-text cnt-s-2">
                  Camil recibió tu mensaje y se pondrá en contacto a la brevedad.<br /><br />Gracias por dar el primer paso 💌
                </p>
                <div className="cnt-success-divider cnt-s-2" />
                <button className="cnt-success-reset cnt-s-3" onClick={handleReset}>Enviar otra solicitud</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {renderLegalPopup()}
    </section>
  );
};

export default ContactScreen;