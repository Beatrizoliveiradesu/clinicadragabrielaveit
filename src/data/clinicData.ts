export const WA_NUMBER = "5548984973968";
export const WA_QR = "https://api.whatsapp.com/qr/R3ER3QKCSVCOM1?autoload=1&app_absent=0";

export const getWhatsAppUrl = (text: string) => {
  return WA_NUMBER
    ? `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`
    : WA_QR;
};

export interface TreatmentItem {
  title: string;
  desc: string;
}

export interface TreatmentGroup {
  label: string;
  title: string;
  items: TreatmentItem[];
}

export const treatmentGroups: TreatmentGroup[] = [
  {
    label: "Saúde & Metabolismo",
    title: "Medicina Integrativa",
    items: [
      {
        title: "Medicina Integrativa",
        desc: "Consulta de 1h30 com avaliação metabólica, hormonal e plano de prevenção."
      },
      {
        title: "Emagrecimento com acompanhamento médico",
        desc: "Plano individual para reduzir gordura corporal e visceral preservando massa magra."
      },
      {
        title: "Exames genéticos e de precisão",
        desc: "Painéis que apoiam condutas preventivas personalizadas."
      }
    ]
  },
  {
    label: "Estética Facial",
    title: "Rosto",
    items: [
      {
        title: "Harmonização Facial",
        desc: "Ácido hialurônico em mandíbula, malar, queixo e lábios, com resultado natural."
      },
      {
        title: "Toxina botulínica",
        desc: "Suavização das linhas de expressão na testa, glabela e região dos olhos."
      }
    ]
  },
  {
    label: "Estética Corporal",
    title: "Corpo",
    items: [
      {
        title: "Gordura localizada abdominal",
        desc: "Protocolos médicos para o contorno da cintura."
      },
      {
        title: "Tratamento de glúteos",
        desc: "Bioestimulação e preenchimento para firmeza e contorno."
      },
      {
        title: "Flacidez de pele",
        desc: "Bioestimuladores de colágeno para rosto, abdômen, coxas e braços."
      }
    ]
  },
  {
    label: "Cabelo & Sono",
    title: "Bem-estar",
    items: [
      {
        title: "Tratamento capilar",
        desc: "Investigação da queda e terapias para fortalecer os fios."
      },
      {
        title: "Insônia e qualidade do sono",
        desc: "Avaliação hormonal e metabólica dos fatores que prejudicam o sono."
      }
    ]
  }
];

export const carouselSlides = [
  { src: "/images/slide-01.jpg", alt: "Dra. Gabriela Veit em atendimento no consultório" },
  { src: "/images/slide-02.jpg", alt: "Dra. Gabriela Veit - Medicina Integrativa" },
  { src: "/images/slide-03.jpg", alt: "Consultório Dra. Gabriela Veit na Pedra Branca" },
  { src: "/images/slide-04.jpg", alt: "Atendimento e avaliação médica individualizada" },
  { src: "/images/slide-05.jpg", alt: "Dra. Gabriela Veit especialista em saúde integral" },
  { src: "/images/slide-06.jpg", alt: "Espaço acolhedor e exclusivo para pacientes" },
  { src: "/images/slide-07.jpg", alt: "Procedimentos de estética e rejuvenescimento facial" },
  { src: "/images/slide-08.jpg", alt: "Acompanhamento médico para longevidade e saúde" },
  { src: "/images/slide-09.jpg", alt: "Estrutura moderna no Edifício Office Green" },
  { src: "/images/slide-10.jpg", alt: "Consulta médica sem pressa com foco na causa raiz" },
  { src: "/images/slide-11.jpg", alt: "Dra. Gabriela Veit - CRM-SC 41005" }
];
