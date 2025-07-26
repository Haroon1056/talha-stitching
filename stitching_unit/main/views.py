from django.core.mail import send_mail
from django.shortcuts import render
from .forms import ContactForm
from django.conf import settings

def home(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            subject = form.cleaned_data['subject']  # ← fixed here
            message = form.cleaned_data['message']

            full_message = f"From: {name} <{email}>\n\nSubject: {subject}\n\nMessage:\n{message}"

            send_mail(
                subject=f"Talha Stitching Unit - Contact Form Submission - {subject}",
                message=full_message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.CONTACT_EMAIL],
            )

            return render(request, 'index.html', {
                'form': ContactForm(),  # reset the form
                'success': True         # flag for success message
            })
    else:
        form = ContactForm()

    return render(request, 'index.html', {'form': form})
