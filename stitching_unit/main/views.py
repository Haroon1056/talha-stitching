from django.shortcuts import render, redirect
from .forms import ContactForm

def home(request):
    return render(request, 'index.html')

def home(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('/')  # or redirect to a success message page
    else:
        form = ContactForm()
    return render(request, 'index.html', {'form': form})
