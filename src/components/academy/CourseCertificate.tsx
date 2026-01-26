import { useRef } from "react";
import { Award, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Course } from "@/hooks/useCourses";
import type { UserCertificate } from "@/hooks/useProgress";
import { format } from "date-fns";

interface CourseCertificateProps {
  course: Course;
  certificate: UserCertificate;
  userName: string;
}

export function CourseCertificate({ course, certificate, userName }: CourseCertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    // Create a printable version
    const printWindow = window.open("", "_blank");
    if (!printWindow || !certificateRef.current) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Certificate - ${course.title}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Georgia', serif; }
            .certificate {
              width: 100%;
              max-width: 900px;
              margin: 40px auto;
              padding: 60px;
              border: 8px double #0f4c3a;
              background: linear-gradient(135deg, #f8fdf8 0%, #e8f5e9 100%);
              text-align: center;
            }
            .logo { font-size: 24px; font-weight: bold; color: #0f4c3a; margin-bottom: 20px; }
            .title { font-size: 42px; color: #0f4c3a; margin-bottom: 10px; }
            .subtitle { font-size: 18px; color: #666; margin-bottom: 30px; }
            .recipient { font-size: 32px; color: #1a5c4a; font-style: italic; margin: 20px 0; }
            .course-title { font-size: 24px; color: #0f4c3a; margin: 20px 0; }
            .details { font-size: 14px; color: #666; margin-top: 40px; }
            .code { font-family: monospace; background: #0f4c3a; color: white; padding: 8px 16px; display: inline-block; margin-top: 20px; }
            @media print {
              body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>
          <div class="certificate">
            <div class="logo">🌍 SPAC Network Academy</div>
            <div class="title">Certificate of Completion</div>
            <div class="subtitle">This is to certify that</div>
            <div class="recipient">${userName}</div>
            <div class="subtitle">has successfully completed the course</div>
            <div class="course-title">${course.title}</div>
            <div class="details">
              <p>Level: ${course.level} | Duration: ${course.estimated_hours} hours</p>
              <p>Completed on: ${format(new Date(certificate.issued_at), "MMMM d, yyyy")}</p>
            </div>
            <div class="code">${certificate.certificate_code}</div>
          </div>
          <script>window.print();</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleShare = async () => {
    const shareData = {
      title: `Certificate: ${course.title}`,
      text: `I just completed "${course.title}" at SPAC Academy! 🌍 #ClimateAction #SPACNetwork`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
      alert("Share text copied to clipboard!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Certificate Preview */}
      <div
        ref={certificateRef}
        className="bg-gradient-to-br from-green-50 to-emerald-100 border-8 border-double border-primary p-12 rounded-xl text-center mb-6"
      >
        <Award className="h-16 w-16 text-primary mx-auto mb-4" />
        <h2 className="text-lg text-primary font-medium mb-2">SPAC Network Academy</h2>
        <h1 className="text-4xl font-serif font-bold text-primary mb-2">
          Certificate of Completion
        </h1>
        <p className="text-muted-foreground mb-6">This is to certify that</p>

        <p className="text-3xl font-serif italic text-primary mb-4">{userName}</p>

        <p className="text-muted-foreground mb-2">has successfully completed the course</p>

        <h3 className="text-2xl font-bold text-primary mb-6">{course.title}</h3>

        <div className="text-sm text-muted-foreground space-y-1">
          <p>Level: {course.level} | Duration: {course.estimated_hours} hours</p>
          <p>Completed on: {format(new Date(certificate.issued_at), "MMMM d, yyyy")}</p>
        </div>

        <div className="mt-6 inline-block bg-primary text-primary-foreground px-4 py-2 rounded font-mono text-sm">
          {certificate.certificate_code}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-4">
        <Button onClick={handleDownload}>
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
        <Button variant="outline" onClick={handleShare}>
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  );
}
