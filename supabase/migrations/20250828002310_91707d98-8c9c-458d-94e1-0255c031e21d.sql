-- Create profiles table for user management
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT, 
  email TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 


CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 


-- Create cohorts table
CREATE TABLE public.cohorts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  cohort_number INTEGER NOT NULL,
  start_date DATE,
  end_date DATE,
  max_participants INTEGER DEFAULT 20,
  current_participants INTEGER DEFAULT 0,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'closed', 'in_progress', 'completed')),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(cohort_number)
);

-- Enable RLS on cohorts (public read access)
ALTER TABLE public.cohorts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view cohorts" 
ON public.cohorts 
FOR SELECT 
USING (true);

-- Create applications table for program applications
CREATE TABLE public.applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id TEXT NOT NULL UNIQUE,
  cohort_id UUID REFERENCES public.cohorts(id),
  
  -- Personal Information
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  gender TEXT,
  
  -- Location & Accessibility
  current_location TEXT NOT NULL,
  distance_from_uyo TEXT NOT NULL,
  can_attend_in_person TEXT NOT NULL,
  in_person_explanation TEXT,
  accommodation_plan TEXT,
  
  -- Technical Background
  has_laptop TEXT NOT NULL,
  internet_access TEXT NOT NULL,
  programming_experience TEXT NOT NULL,
  coding_projects TEXT,
  blockchain_familiarity TEXT NOT NULL,
  
  -- Commitment Assessment
  can_commit_time TEXT NOT NULL,
  work_study_status TEXT NOT NULL,
  weekday_availability TEXT NOT NULL,
  can_pay_logistics TEXT NOT NULL,
  logistics_understanding BOOLEAN NOT NULL DEFAULT false,
  
  -- Motivation & Goals
  why_web3 TEXT NOT NULL,
  what_to_build TEXT NOT NULL,
  learning_style JSONB NOT NULL DEFAULT '[]'::jsonb,
  group_project_experience TEXT,
  
  -- Communication & Background
  english_proficiency TEXT NOT NULL,
  willing_to_mentor TEXT,
  education_level TEXT,
  field_of_study TEXT,
  current_profession TEXT,
  
  -- Program Discovery
  how_did_you_hear TEXT NOT NULL,
  other_source TEXT,
  referrer_name TEXT,
  
  -- Final Screening
  applied_to_others TEXT,
  why_chainspace TEXT,
  biggest_challenge TEXT NOT NULL,
  fall_behind_strategy TEXT NOT NULL,
  code_of_conduct_agreement BOOLEAN NOT NULL DEFAULT false,
  commitment_statement BOOLEAN NOT NULL DEFAULT false,
  information_accuracy BOOLEAN NOT NULL DEFAULT false,
  
  -- Optional Information
  unique_about_you TEXT,
  special_circumstances TEXT,
  github_profile TEXT,
  linkedin_profile TEXT,
  personal_projects TEXT,
  
  -- Application metadata
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'accepted', 'rejected', 'waitlisted')),
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewer_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on applications
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for applications
CREATE POLICY "Users can view their own applications" 
ON public.applications 
FOR SELECT 

CREATE POLICY "Users can insert their own applications" 
ON public.applications 
FOR INSERT 

CREATE POLICY "Users can update their own applications" 
ON public.applications 
FOR UPDATE 

-- Create volunteer_applications table
CREATE TABLE public.volunteer_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  position TEXT NOT NULL DEFAULT 'Creative Designer',
  portfolio_url TEXT,
  experience_level TEXT,
  availability TEXT,
  motivation TEXT,
  skills JSONB DEFAULT '[]'::jsonb,
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'accepted', 'rejected')),
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewer_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on volunteer_applications
ALTER TABLE public.volunteer_applications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for volunteer applications
CREATE POLICY "Users can view their own volunteer applications" 
ON public.volunteer_applications 
FOR SELECT 

CREATE POLICY "Users can insert their own volunteer applications" 
ON public.volunteer_applications 
FOR INSERT 

CREATE POLICY "Users can update their own volunteer applications" 
ON public.volunteer_applications 
FOR UPDATE 

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cohorts_updated_at
  BEFORE UPDATE ON public.cohorts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON public.applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_volunteer_applications_updated_at
  BEFORE UPDATE ON public.volunteer_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial cohort data
INSERT INTO public.cohorts (name, cohort_number, start_date, status, description, max_participants, current_participants) VALUES
('Chainspace Web3 Developer Cohort I', 1, '2024-01-15', 'completed', 'First successful cohort with 18 graduates', 20, 18),
('Chainspace Web3 Developer Cohort II', 2, '2024-06-01', 'completed', 'Second cohort building on the success of the first', 25, 22),
('Chainspace Web3 Developer Cohort III', 3, '2025-01-15', 'open', 'Current cohort accepting applications for intensive 12-week Web3 development program', 30, 0);

-- Create function to handle new user profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name'),
    NEW.email
  );
  RETURN NEW;
END;
$$;

-- Create trigger to automatically create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_new_user();