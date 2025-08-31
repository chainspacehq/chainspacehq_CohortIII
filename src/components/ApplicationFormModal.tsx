import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, User, MapPin, Code, Clock, Heart, MessageCircle, Share2, Shield, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

// Form schema
const applicationSchema = z.object({
  // Section 1: Personal Information
  fullName: z.string().min(2, 'Full name must contain at least 2 words'),
  email: z.string().email('Invalid email format'),
  phone: z.string().regex(/^(\+234\d{10}|\d{11})$/, 'Phone must be either +234XXXXXXXXXX or 11 digits'),
  dateOfBirth: z.string().refine(date => {
    const birthDate = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    return age >= 18;
  }, 'Must be 18 years or older'),
  gender: z.string().optional(),
  // Section 2: Location & Accessibility
  currentLocation: z.string().min(1, 'Current location is required'),
  distanceFromUyo: z.string().min(1, 'Distance from Uyo is required'),
  canAttendInPerson: z.string().min(1, 'Please specify if you can attend in-person'),
  inPersonExplanation: z.string().optional(),
  accommodationPlan: z.string().optional(),
  // Section 3: Technical Background
  hasLaptop: z.string().min(1, 'Please specify if you have a laptop'),
  internetAccess: z.string().min(1, 'Internet access information is required'),
  programmingExperience: z.string().min(1, 'Programming experience level is required'),
  codingProjects: z.string().optional(),
  blockchainFamiliarity: z.string().min(1, 'Blockchain familiarity level is required'),
  // Section 4: Commitment Assessment
  canCommitTime: z.string().min(1, 'Time commitment confirmation is required'),
  workStudyStatus: z.string().min(1, 'Work/study status is required'),
  weekdayAvailability: z.string().min(1, 'Weekday availability is required'),
  logisticsUnderstanding: z.boolean().refine(val => val === true, 'You must acknowledge the logistics understanding'),
  // Section 5: Motivation & Goals
  whyWeb3: z.string().min(150, 'Please provide at least 150 characters').max(300, 'Maximum 300 characters'),
  whatToBuild: z.string().min(100, 'Please provide at least 100 characters').max(200, 'Maximum 200 characters'),
  learningStyle: z.array(z.string()).min(1, 'Please select at least one learning style'),
  groupProjectExperience: z.string().optional(),
  // Section 6: Communication & Background
  englishProficiency: z.string().min(1, 'English proficiency level is required'),
  willingToMentor: z.string().optional(),
  educationLevel: z.string().optional(),
  fieldOfStudy: z.string().optional(),
  currentProfession: z.string().optional(),
  // Section 7: Program Discovery
  howDidYouHear: z.string().min(1, 'Please specify how you heard about us'),
  otherSource: z.string().optional(),
  referrerName: z.string().optional(),
  // Section 8: Final Screening
  appliedToOthers: z.string().optional(),
  whyChainspace: z.string().optional(),
  biggestChallenge: z.string().min(1, 'Please specify your biggest expected challenge').max(100, 'Maximum 100 characters'),
  fallBehindStrategy: z.string().min(1, 'Please select a strategy'),
  codeOfConductAgreement: z.boolean().refine(val => val === true, 'You must agree to the code of conduct'),
  commitmentStatement: z.boolean().refine(val => val === true, 'You must acknowledge the commitment statement'),
  informationAccuracy: z.boolean().refine(val => val === true, 'You must confirm information accuracy'),
  // Section 9: Optional Information
  uniqueAboutYou: z.string().optional(),
  specialCircumstances: z.string().optional(),
  githubProfile: z.string().url().optional().or(z.literal('')),
  linkedinProfile: z.string().url().optional().or(z.literal('')),
  personalProjects: z.string().url().optional().or(z.literal(''))
});
type ApplicationFormData = z.infer<typeof applicationSchema>;
interface ApplicationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const SECTIONS = [{
  id: 1,
  title: 'Personal Information',
  icon: User
}, {
  id: 2,
  title: 'Location & Accessibility',
  icon: MapPin
}, {
  id: 3,
  title: 'Technical Background',
  icon: Code
}, {
  id: 4,
  title: 'Commitment Assessment',
  icon: Clock
}, {
  id: 5,
  title: 'Motivation & Goals',
  icon: Heart
}, {
  id: 6,
  title: 'Communication & Background',
  icon: MessageCircle
}, {
  id: 7,
  title: 'Program Discovery',
  icon: Share2
}, {
  id: 8,
  title: 'Final Screening',
  icon: Shield
}, {
  id: 9,
  title: 'Optional Information',
  icon: FileText
}];
const ApplicationFormModal: React.FC<ApplicationFormModalProps> = ({
  isOpen,
  onClose
}) => {
  const [currentSection, setCurrentSection] = useState(1);
  const { toast } = useToast();
  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    mode: 'onBlur',
    defaultValues: {
      learningStyle: [],
      codeOfConductAgreement: false,
      commitmentStatement: false,
      informationAccuracy: false,
      logisticsUnderstanding: false
    }
  });
  const {
    handleSubmit,
    watch,
    formState: {
      errors
    },
    trigger,
    setValue
  } = form;

  // Save to localStorage on form changes
  useEffect(() => {
    const subscription = watch(data => {
      localStorage.setItem('chainspace-application-draft', JSON.stringify(data));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('chainspace-application-draft');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        Object.keys(parsedData).forEach(key => {
          if (parsedData[key] !== undefined && parsedData[key] !== null) {
            setValue(key as keyof ApplicationFormData, parsedData[key]);
          }
        });
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, [setValue]);
  const progress = currentSection / SECTIONS.length * 100;
  const currentSectionData = SECTIONS.find(s => s.id === currentSection);
  const validateCurrentSection = async () => {
    const sectionFields = getSectionFields(currentSection);
    const isValid = await trigger(sectionFields);
    return isValid;
  };
  const getSectionFields = (sectionId: number): (keyof ApplicationFormData)[] => {
    switch (sectionId) {
      case 1:
        return ['fullName', 'email', 'phone', 'dateOfBirth'];
      case 2:
        return ['currentLocation', 'distanceFromUyo', 'canAttendInPerson'];
      case 3:
        return ['hasLaptop', 'internetAccess', 'programmingExperience', 'blockchainFamiliarity'];
      case 4:
        return ['canCommitTime', 'workStudyStatus', 'weekdayAvailability', 'logisticsUnderstanding'];
      case 5:
        return ['whyWeb3', 'whatToBuild', 'learningStyle'];
      case 6:
        return ['englishProficiency'];
      case 7:
        return ['howDidYouHear'];
      case 8:
        return ['biggestChallenge', 'fallBehindStrategy', 'codeOfConductAgreement', 'commitmentStatement', 'informationAccuracy'];
      case 9:
        return [];
      default:
        return [];
    }
  };
  const nextSection = async () => {
    const isValid = await validateCurrentSection();
    if (isValid && currentSection < SECTIONS.length) {
      setCurrentSection(currentSection + 1);
    }
  };
  const prevSection = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
    }
  };
  const onSubmit = async (data: ApplicationFormData) => {
    try {
      // Generate application ID
      const applicationId = `CS-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Prepare data for Supabase
      const supabaseData = {
        application_id: applicationId,
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        date_of_birth: data.dateOfBirth,
        gender: data.gender || null,
        current_location: data.currentLocation,
        distance_from_uyo: data.distanceFromUyo,
        can_attend_in_person: data.canAttendInPerson,
        in_person_explanation: data.inPersonExplanation || null,
        accommodation_plan: data.accommodationPlan || null,
        has_laptop: data.hasLaptop,
        internet_access: data.internetAccess,
        programming_experience: data.programmingExperience,
        coding_projects: data.codingProjects || null,
        blockchain_familiarity: data.blockchainFamiliarity,
        can_commit_time: data.canCommitTime,
        work_study_status: data.workStudyStatus,
        weekday_availability: data.weekdayAvailability,
        can_pay_logistics: data.canCommitTime, // Using canCommitTime as proxy for logistics payment commitment
        logistics_understanding: data.logisticsUnderstanding,
        why_web3: data.whyWeb3,
        what_to_build: data.whatToBuild,
        group_project_experience: data.groupProjectExperience || null,
        english_proficiency: data.englishProficiency,
        learning_style: data.learningStyle || [],
        willing_to_mentor: data.willingToMentor || null,
        field_of_study: data.fieldOfStudy || null,
        education_level: data.educationLevel || null,
        current_profession: data.currentProfession || null,
        how_did_you_hear: data.howDidYouHear,
        other_source: data.otherSource || null,
        referrer_name: data.referrerName || null,
        applied_to_others: data.appliedToOthers || null,
        biggest_challenge: data.biggestChallenge,
        fall_behind_strategy: data.fallBehindStrategy,
        why_chainspace: data.whyChainspace || null,
        unique_about_you: data.uniqueAboutYou || null,
        special_circumstances: data.specialCircumstances || null,
        github_profile: data.githubProfile || null,
        linkedin_profile: data.linkedinProfile || null,
        personal_projects: data.personalProjects || null,
        code_of_conduct_agreement: data.codeOfConductAgreement,
        commitment_statement: data.commitmentStatement,
        information_accuracy: data.informationAccuracy,
        submitted_at: new Date().toISOString()
      };

      // Save to Supabase database
      const { error: supabaseError } = await supabase
        .from('applications')
        .insert([supabaseData]);

      if (supabaseError) {
        console.error('Supabase error:', supabaseError);
        throw new Error(supabaseError.message);
      }

      // Clear draft from localStorage after successful submission
      localStorage.removeItem('chainspace-application-draft');

      // Keep a backup in localStorage with submitted status
      const submittedApplication = {
        ...data,
        applicationId,
        submittedAt: new Date().toISOString(),
        status: 'submitted'
      };
      localStorage.setItem('chainspace-application-submitted', JSON.stringify(submittedApplication));

      // Show success message
      toast({
        title: "Application Submitted Successfully!",
        description: `Your application ID is: ${applicationId}. We'll contact you within 7 business days.`
      });

      // Close modal
      onClose();
    } catch (error) {
      console.error('Application submission error:', error);
      toast({
        title: "Submission Error",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive"
      });
    }
  };
  const renderSection = () => {
    const {
      canAttendInPerson,
      programmingExperience,
      howDidYouHear,
      appliedToOthers
    } = watch();
    switch (currentSection) {
      case 1:
        return <PersonalInformationSection form={form} />;
      case 2:
        return <LocationAccessibilitySection form={form} canAttendInPerson={canAttendInPerson} />;
      case 3:
        return <TechnicalBackgroundSection form={form} programmingExperience={programmingExperience} />;
      case 4:
        return <CommitmentAssessmentSection form={form} />;
      case 5:
        return <MotivationGoalsSection form={form} />;
      case 6:
        return <CommunicationBackgroundSection form={form} />;
      case 7:
        return <ProgramDiscoverySection form={form} howDidYouHear={howDidYouHear} />;
      case 8:
        return <FinalScreeningSection form={form} appliedToOthers={appliedToOthers} />;
      case 9:
        return <OptionalInformationSection form={form} />;
      default:
        return null;
    }
  };
  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-chainspace-black border-chainspace-orange">
        <DialogHeader className="pb-4 border-b border-chainspace-orange/20">
          <DialogTitle className="text-2xl font-bold text-chainspace-white text-center">
            ChainspaceHQ Web3 Developer Cohort III
          </DialogTitle>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2 text-chainspace-orange">
              {currentSectionData && <currentSectionData.icon className="w-5 h-5" />}
              <span className="font-semibold">Step {currentSection} of {SECTIONS.length}</span>
            </div>
            <div className="text-chainspace-white text-sm">
              {currentSectionData?.title}
            </div>
          </div>
          <Progress value={progress} className="mt-2 h-2 bg-chainspace-dark-gray" />
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="min-h-[400px] py-6">
              {renderSection()}
            </div>

            <div className="flex justify-between pt-4 border-t border-chainspace-orange/20">
              <Button type="button" variant="outline" onClick={prevSection} disabled={currentSection === 1} className="border-chainspace-orange text-chainspace-orange hover:bg-chainspace-orange hover:text-chainspace-black">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {currentSection === SECTIONS.length ? <Button type="submit" className="bg-chainspace-orange text-chainspace-black hover:bg-chainspace-orange-bright font-bold">
                  Submit Application
                </Button> : <Button type="button" onClick={nextSection} className="bg-chainspace-orange text-chainspace-black hover:bg-chainspace-orange-bright">
                  Next Step
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>;
};

// Section Components
const PersonalInformationSection: React.FC<{
  form: any;
}> = ({
  form
}) => <div className="space-y-6">
    <div className="text-center mb-6">
      <h3 className="text-xl font-bold text-chainspace-orange mb-2">Personal Information</h3>
      <p className="text-chainspace-white/70">Tell us about yourself</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField control={form.control} name="fullName" render={({
      field
    }) => <FormItem>
            <FormLabel className="text-chainspace-white">Full Name <span className="text-chainspace-orange">*</span></FormLabel>
            <FormControl>
              <Input {...field} className="bg-chainspace-dark-gray border-chainspace-orange/30 text-chainspace-white" />
            </FormControl>
            <FormMessage className="text-destructive" />
          </FormItem>} />

      <FormField control={form.control} name="email" render={({
      field
    }) => <FormItem>
            <FormLabel className="text-chainspace-white">Email Address <span className="text-chainspace-orange">*</span></FormLabel>
            <FormControl>
              <Input {...field} type="email" className="bg-chainspace-dark-gray border-chainspace-orange/30 text-chainspace-white" />
            </FormControl>
            <FormMessage className="text-destructive" />
          </FormItem>} />

      <FormField control={form.control} name="phone" render={({
      field
    }) => <FormItem>
            <FormLabel className="text-chainspace-white">Phone Number <span className="text-chainspace-orange">*</span></FormLabel>
            <FormControl>
              <Input {...field} placeholder="+234XXXXXXXXXX" className="bg-chainspace-dark-gray border-chainspace-orange/30 text-chainspace-white" />
            </FormControl>
            <FormMessage className="text-destructive" />
          </FormItem>} />

      <FormField control={form.control} name="dateOfBirth" render={({
      field
    }) => <FormItem>
            <FormLabel className="text-chainspace-white">Date of Birth <span className="text-chainspace-orange">*</span></FormLabel>
            <FormControl>
              <Input {...field} type="date" className="bg-chainspace-dark-gray border-chainspace-orange/30 text-chainspace-white" />
            </FormControl>
            <FormMessage className="text-destructive" />
          </FormItem>} />

      <FormField control={form.control} name="gender" render={({
      field
    }) => <FormItem>
            <FormLabel className="text-chainspace-white">Gender</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-chainspace-dark-gray border-chainspace-orange/30 text-chainspace-white">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-chainspace-dark-gray border-chainspace-orange">
                <SelectItem value="male" className="text-chainspace-white hover:bg-chainspace-orange/20">Male</SelectItem>
                <SelectItem value="female" className="text-chainspace-white hover:bg-chainspace-orange/20">Female</SelectItem>
                <SelectItem value="prefer-not-to-say" className="text-chainspace-white hover:bg-chainspace-orange/20">Prefer not to say</SelectItem>
                <SelectItem value="other" className="text-chainspace-white hover:bg-chainspace-orange/20">Other</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage className="text-destructive" />
          </FormItem>} />
    </div>
  </div>;
const LocationAccessibilitySection: React.FC<{
  form: any;
  canAttendInPerson: string;
}> = ({
  form,
  canAttendInPerson
}) => <div className="space-y-6">
    <div className="text-center mb-6">
      <h3 className="text-xl font-bold text-chainspace-orange mb-2">Location & Accessibility</h3>
      <p className="text-chainspace-white/70">Help us understand your location and availability</p>
    </div>

    <div className="space-y-4">
      <FormField control={form.control} name="currentLocation" render={({
      field
    }) => <FormItem>
            <FormLabel className="text-chainspace-white">Current Location <span className="text-chainspace-orange">*</span></FormLabel>
            <FormControl>
              <Input {...field} placeholder="City, State" className="bg-chainspace-dark-gray border-chainspace-orange/30 text-chainspace-white" />
            </FormControl>
            <FormMessage className="text-destructive" />
          </FormItem>} />

      <FormField control={form.control} name="distanceFromUyo" render={({
      field
    }) => <FormItem>
            <FormLabel className="text-chainspace-white">Distance from Uyo <span className="text-chainspace-orange">*</span></FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-chainspace-dark-gray border-chainspace-orange/30 text-chainspace-white">
                  <SelectValue placeholder="Select distance" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-chainspace-dark-gray border-chainspace-orange">
                <SelectItem value="within-uyo" className="text-chainspace-white hover:bg-chainspace-orange/20">Within Uyo</SelectItem>
                <SelectItem value="1-2-hours" className="text-chainspace-white hover:bg-chainspace-orange/20">1-2 hours travel</SelectItem>
                <SelectItem value="2-4-hours" className="text-chainspace-white hover:bg-chainspace-orange/20">2-4 hours travel</SelectItem>
                <SelectItem value="4-plus-hours" className="text-chainspace-white hover:bg-chainspace-orange/20">4+ hours travel</SelectItem>
                <SelectItem value="will-relocate" className="text-chainspace-white hover:bg-chainspace-orange/20">Will relocate to Uyo</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage className="text-destructive" />
          </FormItem>} />

      <FormField control={form.control} name="canAttendInPerson" render={({
      field
    }) => <FormItem>
            <FormLabel className="text-chainspace-white">Can you attend in-person classes in Uyo? <span className="text-chainspace-orange">*</span></FormLabel>
            <FormControl>
              <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="attend-yes" className="border-chainspace-orange text-chainspace-orange" />
                  <Label htmlFor="attend-yes" className="text-chainspace-white">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="attend-no" className="border-chainspace-orange text-chainspace-orange" />
                  <Label htmlFor="attend-no" className="text-chainspace-white">No</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage className="text-destructive" />
          </FormItem>} />

      {canAttendInPerson === 'no' && <>
          <FormField control={form.control} name="inPersonExplanation" render={({
        field
      }) => <FormItem>
                <FormLabel className="text-chainspace-white">Please explain why you can't attend in-person</FormLabel>
                <FormControl>
                  <Textarea {...field} maxLength={100} className="bg-chainspace-dark-gray border-chainspace-orange/30 text-chainspace-white" />
                </FormControl>
                <div className="text-right text-sm text-chainspace-white/50">
                  {field.value?.length || 0}/100
                </div>
                <FormMessage className="text-destructive" />
              </FormItem>} />

          <FormField control={form.control} name="accommodationPlan" render={({
        field
      }) => <FormItem>
                <FormLabel className="text-chainspace-white">Accommodation Plan</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-chainspace-dark-gray border-chainspace-orange/30 text-chainspace-white">
                      <SelectValue placeholder="Select accommodation plan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-chainspace-dark-gray border-chainspace-orange">
                    <SelectItem value="friends-family" className="text-chainspace-white hover:bg-chainspace-orange/20">Stay with friends/family</SelectItem>
                    <SelectItem value="rent" className="text-chainspace-white hover:bg-chainspace-orange/20">Will rent accommodation</SelectItem>
                    <SelectItem value="hotel" className="text-chainspace-white hover:bg-chainspace-orange/20">Hotel/lodging</SelectItem>
                    <SelectItem value="planning" className="text-chainspace-white hover:bg-chainspace-orange/20">Still planning</SelectItem>
                    <SelectItem value="other" className="text-chainspace-white hover:bg-chainspace-orange/20">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-destructive" />
              </FormItem>} />
        </>}
    </div>
  </div>;
const TechnicalBackgroundSection: React.FC<{
  form: any;
  programmingExperience: string;
}> = ({
  form,
  programmingExperience
}) => <div className="space-y-6">
    <div className="text-center mb-6">
      <h3 className="text-xl font-bold text-chainspace-orange mb-2">Technical Background</h3>
      <p className="text-chainspace-white/70">Tell us about your technical experience and setup</p>
    </div>

    <div className="space-y-4">
      <FormField control={form.control} name="hasLaptop" render={({
      field
    }) => <FormItem>
            <FormLabel className="text-chainspace-white">Do you own a functional laptop? <span className="text-chainspace-orange">*</span></FormLabel>
            <FormControl>
              <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="laptop-yes" className="border-chainspace-orange text-chainspace-orange" />
                  <Label htmlFor="laptop-yes" className="text-chainspace-white">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="laptop-no" className="border-chainspace-orange text-chainspace-orange" />
                  <Label htmlFor="laptop-no" className="text-chainspace-white">No</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage className="text-destructive" />
          </FormItem>} />

      <FormField control={form.control} name="internetAccess" render={({
      field
    }) => <FormItem>
            <FormLabel className="text-chainspace-white">Internet Access <span className="text-chainspace-orange">*</span></FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-chainspace-dark-gray border-chainspace-orange/30 text-chainspace-white">
                  <SelectValue placeholder="Select internet access type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-chainspace-dark-gray border-chainspace-orange">
                <SelectItem value="reliable-home" className="text-chainspace-white hover:bg-chainspace-orange/20">Reliable home internet</SelectItem>
                <SelectItem value="mobile-only" className="text-chainspace-white hover:bg-chainspace-orange/20">Mobile data only</SelectItem>
                <SelectItem value="workspace" className="text-chainspace-white hover:bg-chainspace-orange/20">Will use workspace internet</SelectItem>
                <SelectItem value="uncertain" className="text-chainspace-white hover:bg-chainspace-orange/20">Uncertain/Need support</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage className="text-destructive" />
          </FormItem>} />

      <FormField control={form.control} name="programmingExperience" render={({
      field
    }) => <FormItem>
            <FormLabel className="text-chainspace-white">Programming Experience <span className="text-chainspace-orange">*</span></FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-chainspace-dark-gray border-chainspace-orange/30 text-chainspace-white">
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-chainspace-dark-gray border-chainspace-orange">
                <SelectItem value="beginner" className="text-chainspace-white hover:bg-chainspace-orange/20">Complete beginner (never coded)</SelectItem>
                <SelectItem value="tutorials" className="text-chainspace-white hover:bg-chainspace-orange/20">Tried online tutorials (HTML/CSS basics)</SelectItem>
                <SelectItem value="some-js" className="text-chainspace-white hover:bg-chainspace-orange/20">Some JavaScript/Python experience</SelectItem>
                <SelectItem value="small-projects" className="text-chainspace-white hover:bg-chainspace-orange/20">Built small projects before</SelectItem>
                <SelectItem value="professional" className="text-chainspace-white hover:bg-chainspace-orange/20">Professional developer</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage className="text-destructive" />
          </FormItem>} />

      {programmingExperience && programmingExperience !== 'beginner' && <FormField control={form.control} name="codingProjects" render={({
      field
    }) => <FormItem>
              <FormLabel className="text-chainspace-white">What have you built?</FormLabel>
              <FormControl>
                <Textarea {...field} maxLength={200} className="bg-chainspace-dark-gray border-chainspace-orange/30 text-chainspace-white" />
              </FormControl>
              <div className="text-right text-sm text-chainspace-white/50">
                {field.value?.length || 0}/200
              </div>
              <FormMessage className="text-destructive" />
            </FormItem>} />}

      <FormField control={form.control} name="blockchainFamiliarity" render={({
      field
    }) => <FormItem>
            <FormLabel className="text-chainspace-white">Blockchain/Crypto Familiarity <span className="text-chainspace-orange">*</span></FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-chainspace-dark-gray border-chainspace-orange/30 text-chainspace-white">
                  <SelectValue placeholder="Select familiarity level" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-chainspace-dark-gray border-chainspace-orange">
                <SelectItem value="never-heard" className="text-chainspace-white hover:bg-chainspace-orange/20">Never heard of it</SelectItem>
                <SelectItem value="basics" className="text-chainspace-white hover:bg-chainspace-orange/20">Know the basics (Bitcoin, etc.)</SelectItem>
                <SelectItem value="use-wallets" className="text-chainspace-white hover:bg-chainspace-orange/20">Use crypto wallets/DeFi</SelectItem>
                <SelectItem value="technical" className="text-chainspace-white hover:bg-chainspace-orange/20">Some technical understanding</SelectItem>
                <SelectItem value="built-projects" className="text-chainspace-white hover:bg-chainspace-orange/20">Built blockchain projects</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage className="text-destructive" />
          </FormItem>} />
    </div>
  </div>;
const CommitmentAssessmentSection: React.FC<{
  form: any;
}> = ({
  form
}) => <div className="space-y-6">
    <div className="text-center mb-6">
      <h3 className="text-xl font-bold text-chainspace-orange mb-2">Commitment Assessment</h3>
      <p className="text-chainspace-white/70">Help us understand your availability and commitment</p>
    </div>

    <div className="space-y-4">
      <FormField control={form.control} name="canCommitTime" render={({
      field
    }) => <FormItem>
            <FormLabel className="text-chainspace-white">Can you commit 21+ hours per week for 3 months? <span className="text-chainspace-orange">*</span></FormLabel>
            <FormControl>
              <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="commit-yes" className="border-chainspace-orange text-chainspace-orange" />
                  <Label htmlFor="commit-yes" className="text-chainspace-white">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="commit-no" className="border-chainspace-orange text-chainspace-orange" />
                  <Label htmlFor="commit-no" className="text-chainspace-white">No</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage className="text-destructive" />
          </FormItem>} />

      <FormField control={form.control} name="workStudyStatus" render={({
      field
    }) => <FormItem>
            <FormLabel className="text-chainspace-white">Current Work/Study Status <span className="text-chainspace-orange">*</span></FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-chainspace-dark-gray border-chainspace-orange/30 text-chainspace-white">
                  <SelectValue placeholder="Select your current status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-chainspace-dark-gray border-chainspace-orange">
                <SelectItem value="unemployed" className="text-chainspace-white hover:bg-chainspace-orange/20">Unemployed/Available full-time</SelectItem>
                <SelectItem value="part-time" className="text-chainspace-white hover:bg-chainspace-orange/20">Part-time work (flexible schedule)</SelectItem>
                <SelectItem value="full-time-flexible" className="text-chainspace-white hover:bg-chainspace-orange/20">Full-time work (evenings free)</SelectItem>
                <SelectItem value="student" className="text-chainspace-white hover:bg-chainspace-orange/20">Student (manageable schedule)</SelectItem>
                <SelectItem value="full-time-demanding" className="text-chainspace-white hover:bg-chainspace-orange/20">Full-time with demanding schedule</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage className="text-destructive" />
          </FormItem>} />

      <FormField control={form.control} name="weekdayAvailability" render={({
      field
    }) => <FormItem>
            <FormLabel className="text-chainspace-white">Mon/Wed/Fri 5:00 PM Availability <span className="text-chainspace-orange">*</span></FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-chainspace-dark-gray border-chainspace-orange/30 text-chainspace-white">
                  <SelectValue placeholder="Select availability" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-chainspace-dark-gray border-chainspace-orange">
                <SelectItem value="always" className="text-chainspace-white hover:bg-chainspace-orange/20">Always available</SelectItem>
                <SelectItem value="mostly" className="text-chainspace-white hover:bg-chainspace-orange/20">Mostly available</SelectItem>
                <SelectItem value="sometimes" className="text-chainspace-white hover:bg-chainspace-orange/20">Sometimes conflicted</SelectItem>
                <SelectItem value="not-available" className="text-chainspace-white hover:bg-chainspace-orange/20">Not available</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage className="text-destructive" />
          </FormItem>} />

      <FormField control={form.control} name="logisticsUnderstanding" render={({
      field
    }) => <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox checked={field.value} onCheckedChange={field.onChange} className="border-chainspace-orange data-[state=checked]:bg-chainspace-orange data-[state=checked]:text-chainspace-black" />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="text-chainspace-white">
                I understand ₦20,000 covers workspace access, internet, power, materials, and ID card only <span className="text-chainspace-orange">*</span>
              </FormLabel>
            </div>
            <FormMessage className="text-destructive" />
          </FormItem>} />
    </div>
  </div>;
const MotivationGoalsSection: React.FC<{
  form: any;
}> = ({
  form
}) => <div className="space-y-6">
    <div className="text-center mb-6">
      <h3 className="text-xl font-bold text-chainspace-orange mb-2">Motivation & Goals</h3>
      <p className="text-chainspace-white/70">Tell us about your motivations and learning preferences</p>
    </div>

    <div className="space-y-4">
      <FormField control={form.control} name="whyWeb3" render={({
      field
    }) => <FormItem>
            <FormLabel className="text-chainspace-white">Why do you want to learn Web3 development? <span className="text-chainspace-orange">*</span></FormLabel>
            <FormControl>
              <Textarea {...field} minLength={150} maxLength={300} className="bg-chainspace-dark-gray border-chainspace-orange/30 text-chainspace-white min-h-[100px]" />
            </FormControl>
            <div className="text-right text-sm text-chainspace-white/50">
              {field.value?.length || 0}/300 (min 150)
            </div>
            <FormMessage className="text-destructive" />
          </FormItem>} />

      <FormField control={form.control} name="whatToBuild" render={({
      field
    }) => <FormItem>
            <FormLabel className="text-chainspace-white">What do you hope to build after this program? <span className="text-chainspace-orange">*</span></FormLabel>
            <FormControl>
              <Textarea {...field} minLength={100} maxLength={200} className="bg-chainspace-dark-gray border-chainspace-orange/30 text-chainspace-white min-h-[80px]" />
            </FormControl>
            <div className="text-right text-sm text-chainspace-white/50">
              {field.value?.length || 0}/200 (min 100)
            </div>
            <FormMessage className="text-destructive" />
          </FormItem>} />

      <FormField control={form.control} name="learningStyle" render={() => <FormItem>
            <FormLabel className="text-chainspace-white">How do you learn best? <span className="text-chainspace-orange">*</span> (Select all that apply)</FormLabel>
            <div className="space-y-2 mt-2">
              {[{
          id: 'hands-on',
          label: 'Hands-on coding practice'
        }, {
          id: 'lectures',
          label: 'Structured lectures and notes'
        }, {
          id: 'group',
          label: 'Group discussions and collaboration'
        }, {
          id: 'independent',
          label: 'Independent research and exploration'
        }, {
          id: 'mix',
          label: 'Mix of all approaches'
        }].map(option => <FormField key={option.id} control={form.control} name="learningStyle" render={({
          field
        }) => <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value?.includes(option.id)} onCheckedChange={checked => {
              const updatedValue = checked ? [...(field.value || []), option.id] : (field.value || []).filter((value: string) => value !== option.id);
              field.onChange(updatedValue);
            }} className="border-chainspace-orange data-[state=checked]:bg-chainspace-orange data-[state=checked]:text-chainspace-black" />
                      </FormControl>
                      <FormLabel className="text-chainspace-white font-normal">
                        {option.label}
                      </FormLabel>
                    </FormItem>} />)}
            </div>
            <FormMessage className="text-destructive" />
          </FormItem>} />

      <FormField control={form.control} name="groupProjectExperience" render={({
      field
    }) => <FormItem>
            <FormLabel className="text-chainspace-white">Experience with group projects?</FormLabel>
            <FormControl>
              <Textarea {...field} maxLength={150} className="bg-chainspace-dark-gray border-chainspace-orange/30 text-chainspace-white" />
            </FormControl>
            <div className="text-right text-sm text-chainspace-white/50">
              {field.value?.length || 0}/150
            </div>
            <FormMessage className="text-destructive" />
          </FormItem>} />
    </div>
  </div>;
const CommunicationBackgroundSection: React.FC<{
  form: any;
}> = ({
  form
}) => <div className="space-y-6">
    <div className="text-center mb-6">
      <h3 className="text-xl font-bold text-chainspace-orange mb-2">Communication & Background</h3>
      <p className="text-chainspace-white/70">Tell us about your communication skills and background</p>
    </div>

    <div className="space-y-4">
      <FormField control={form.control} name="englishProficiency" render={({
      field
    }) => <FormItem>
            <FormLabel className="text-chainspace-white">English Proficiency Level <span className="text-chainspace-orange">*</span></FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-chainspace-dark-gray border-chainspace-orange/30 text-chainspace-white">
                  <SelectValue placeholder="Select proficiency level" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-chainspace-dark-gray border-chainspace-orange">
                <SelectItem value="fluent" className="text-chainspace-white hover:bg-chainspace-orange/20">Fluent</SelectItem>
                <SelectItem value="good" className="text-chainspace-white hover:bg-chainspace-orange/20">Good</SelectItem>
                <SelectItem value="basic" className="text-chainspace-white hover:bg-chainspace-orange/20">Basic</SelectItem>
                <SelectItem value="need-support" className="text-chainspace-white hover:bg-chainspace-orange/20">Need support</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage className="text-destructive" />
          </FormItem>} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={form.control} name="educationLevel" render={({
        field
      }) => <FormItem>
              <FormLabel className="text-chainspace-white">Highest Education Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-chainspace-dark-gray border-chainspace-orange/30 text-chainspace-white">
                    <SelectValue placeholder="Select education level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-chainspace-dark-gray border-chainspace-orange">
                  <SelectItem value="no-formal" className="text-chainspace-white hover:bg-chainspace-orange/20">No formal education</SelectItem>
                  <SelectItem value="ssce" className="text-chainspace-white hover:bg-chainspace-orange/20">SSCE/WAEC</SelectItem>
                  <SelectItem value="ond" className="text-chainspace-white hover:bg-chainspace-orange/20">OND</SelectItem>
                  <SelectItem value="hnd" className="text-chainspace-white hover:bg-chainspace-orange/20">HND</SelectItem>
                  <SelectItem value="bachelors" className="text-chainspace-white hover:bg-chainspace-orange/20">Bachelor's Degree</SelectItem>
                  <SelectItem value="masters" className="text-chainspace-white hover:bg-chainspace-orange/20">Master's Degree</SelectItem>
                  <SelectItem value="other" className="text-chainspace-white hover:bg-chainspace-orange/20">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-destructive" />
            </FormItem>} />

        <FormField control={form.control} name="fieldOfStudy" render={({
        field
      }) => <FormItem>
              <FormLabel className="text-chainspace-white">Field of Study</FormLabel>
              <FormControl>
                <Input {...field} className="bg-chainspace-dark-gray border-chainspace-orange/30 text-chainspace-white" />
              </FormControl>
              <FormMessage className="text-destructive" />
            </FormItem>} />
      </div>

      <FormField control={form.control} name="currentProfession" render={({
      field
    }) => <FormItem>
            <FormLabel className="text-chainspace-white">Current Profession/Industry</FormLabel>
            <FormControl>
              <Input {...field} className="bg-chainspace-dark-gray border-chainspace-orange/30 text-chainspace-white" />
            </FormControl>
            <FormMessage className="text-destructive" />
          </FormItem>} />
    </div>
  </div>;
const ProgramDiscoverySection: React.FC<{
  form: any;
  howDidYouHear: string;
}> = ({
  form,
  howDidYouHear
}) => <div className="space-y-6">
    <div className="text-center mb-6">
      <h3 className="text-xl font-bold text-chainspace-orange mb-2">Program Discovery</h3>
      <p className="text-chainspace-white/70">Help us understand how you found us</p>
    </div>

    <div className="space-y-4">
      <FormField control={form.control} name="howDidYouHear" render={({
      field
    }) => <FormItem>
            <FormLabel className="text-chainspace-white">How did you hear about ChainspaceHQ? <span className="text-chainspace-orange">*</span></FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-chainspace-dark-gray border-chainspace-orange/30 text-chainspace-white">
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-chainspace-dark-gray border-chainspace-orange">
                <SelectItem value="instagram" className="text-chainspace-white hover:bg-chainspace-orange/20">Social media (Instagram)</SelectItem>
                <SelectItem value="twitter" className="text-chainspace-white hover:bg-chainspace-orange/20">Social media (Twitter)</SelectItem>
                <SelectItem value="facebook" className="text-chainspace-white hover:bg-chainspace-orange/20">Social media (Facebook)</SelectItem>
                <SelectItem value="linkedin" className="text-chainspace-white hover:bg-chainspace-orange/20">Social media (LinkedIn)</SelectItem>
                <SelectItem value="referral" className="text-chainspace-white hover:bg-chainspace-orange/20">Friend/colleague referral</SelectItem>
                <SelectItem value="graduate" className="text-chainspace-white hover:bg-chainspace-orange/20">Previous cohort graduate</SelectItem>
                <SelectItem value="search" className="text-chainspace-white hover:bg-chainspace-orange/20">Online search</SelectItem>
                <SelectItem value="event" className="text-chainspace-white hover:bg-chainspace-orange/20">Event/conference</SelectItem>
                <SelectItem value="whatsapp" className="text-chainspace-white hover:bg-chainspace-orange/20">WhatsApp group/community</SelectItem>
                <SelectItem value="other" className="text-chainspace-white hover:bg-chainspace-orange/20">Other</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage className="text-destructive" />
          </FormItem>} />

      {howDidYouHear === 'other' && <FormField control={form.control} name="otherSource" render={({
      field
    }) => <FormItem>
              <FormLabel className="text-chainspace-white">Please specify</FormLabel>
              <FormControl>
                <Input {...field} className="bg-chainspace-dark-gray border-chainspace-orange/30 text-chainspace-white" />
              </FormControl>
              <FormMessage className="text-destructive" />
            </FormItem>} />}

      <FormField control={form.control} name="referrerName" render={({
      field
    }) => <FormItem>
            <FormLabel className="text-chainspace-white">Referrer's name (if applicable)</FormLabel>
            <FormControl>
              <Input {...field} className="bg-chainspace-dark-gray border-chainspace-orange/30 text-chainspace-white" />
            </FormControl>
            <FormMessage className="text-destructive" />
          </FormItem>} />
    </div>
  </div>;
const FinalScreeningSection: React.FC<{
  form: any;
  appliedToOthers: string;
}> = ({
  form,
  appliedToOthers
}) => <div className="space-y-6">
    <div className="text-center mb-6">
      <h3 className="text-xl font-bold text-chainspace-orange mb-2">Final Screening</h3>
      <p className="text-chainspace-white/70">Final questions and agreements</p>
    </div>

    <div className="space-y-4">
      <FormField control={form.control} name="appliedToOthers" render={({
      field
    }) => <FormItem>
            <FormLabel className="text-chainspace-white">Applied to other coding programs?</FormLabel>
            <FormControl>
              <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="applied-yes" className="border-chainspace-orange text-chainspace-orange" />
                  <Label htmlFor="applied-yes" className="text-chainspace-white">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="applied-no" className="border-chainspace-orange text-chainspace-orange" />
                  <Label htmlFor="applied-no" className="text-chainspace-white">No</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage className="text-destructive" />
          </FormItem>} />

      {appliedToOthers === 'yes' && <FormField control={form.control} name="whyChainspace" render={({
      field
    }) => <FormItem>
              <FormLabel className="text-chainspace-white">Which ones and why ChainspaceHQ?</FormLabel>
              <FormControl>
                <Textarea {...field} maxLength={150} className="bg-chainspace-dark-gray border-chainspace-orange/30 text-chainspace-white" />
              </FormControl>
              <div className="text-right text-sm text-chainspace-white/50">
                {field.value?.length || 0}/150
              </div>
              <FormMessage className="text-destructive" />
            </FormItem>} />}

      <FormField control={form.control} name="biggestChallenge" render={({
      field
    }) => <FormItem>
            <FormLabel className="text-chainspace-white">Biggest challenge you expect? <span className="text-chainspace-orange">*</span></FormLabel>
            <FormControl>
              <Textarea {...field} maxLength={100} className="bg-chainspace-dark-gray border-chainspace-orange/30 text-chainspace-white" />
            </FormControl>
            <div className="text-right text-sm text-chainspace-white/50">
              {field.value?.length || 0}/100
            </div>
            <FormMessage className="text-destructive" />
          </FormItem>} />

      <FormField control={form.control} name="fallBehindStrategy" render={({
      field
    }) => <FormItem>
            <FormLabel className="text-chainspace-white">What will you do if you fall behind? <span className="text-chainspace-orange">*</span></FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-chainspace-dark-gray border-chainspace-orange/30 text-chainspace-white">
                  <SelectValue placeholder="Select strategy" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-chainspace-dark-gray border-chainspace-orange">
                <SelectItem value="extra-help" className="text-chainspace-white hover:bg-chainspace-orange/20">Seek extra help from mentors</SelectItem>
                <SelectItem value="study-groups" className="text-chainspace-white hover:bg-chainspace-orange/20">Form study groups with peers</SelectItem>
                <SelectItem value="more-time" className="text-chainspace-white hover:bg-chainspace-orange/20">Dedicate more personal time</SelectItem>
                <SelectItem value="drop-out" className="text-chainspace-white hover:bg-chainspace-orange/20">Consider dropping out</SelectItem>
                <SelectItem value="other-strategy" className="text-chainspace-white hover:bg-chainspace-orange/20">Other strategy</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage className="text-destructive" />
          </FormItem>} />

      <div className="space-y-4 pt-4 border-t border-chainspace-orange/20">
        <FormField control={form.control} name="codeOfConductAgreement" render={({
        field
      }) => <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} className="border-chainspace-orange data-[state=checked]:bg-chainspace-orange data-[state=checked]:text-chainspace-black" />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-chainspace-white">
                  I agree to maintain professional behavior, attend regularly, and contribute positively <span className="text-chainspace-orange">*</span>
                </FormLabel>
              </div>
              <FormMessage className="text-destructive" />
            </FormItem>} />

        <FormField control={form.control} name="commitmentStatement" render={({
        field
      }) => <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} className="border-chainspace-orange data-[state=checked]:bg-chainspace-orange data-[state=checked]:text-chainspace-black" />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-chainspace-white">
                  I understand this is an intensive 3-month program requiring significant time and effort <span className="text-chainspace-orange">*</span>
                </FormLabel>
              </div>
              <FormMessage className="text-destructive" />
            </FormItem>} />

        <FormField control={form.control} name="informationAccuracy" render={({
        field
      }) => <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} className="border-chainspace-orange data-[state=checked]:bg-chainspace-orange data-[state=checked]:text-chainspace-black" />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-chainspace-white">
                  All information provided is accurate and truthful <span className="text-chainspace-orange">*</span>
                </FormLabel>
              </div>
              <FormMessage className="text-destructive" />
            </FormItem>} />
      </div>
    </div>
  </div>;
const OptionalInformationSection: React.FC<{
  form: any;
}> = ({
  form
}) => <div className="space-y-6">
    <div className="text-center mb-6">
      <h3 className="text-xl font-bold text-chainspace-orange mb-2">Optional Information</h3>
      <p className="text-chainspace-white/70">Share anything else you'd like us to know</p>
    </div>

    <div className="space-y-4">
      <FormField control={form.control} name="uniqueAboutYou" render={({
      field
    }) => <FormItem>
            <FormLabel className="text-chainspace-white">Tell us something unique about yourself</FormLabel>
            <FormControl>
              <Textarea {...field} maxLength={300} className="bg-chainspace-dark-gray border-chainspace-orange/30 text-chainspace-white" />
            </FormControl>
            <div className="text-right text-sm text-chainspace-white/50">
              {field.value?.length || 0}/300
            </div>
            <FormMessage className="text-destructive" />
          </FormItem>} />

      <FormField control={form.control} name="specialCircumstances" render={({
      field
    }) => <FormItem>
            <FormLabel className="text-chainspace-white">Special circumstances we should know?</FormLabel>
            <FormControl>
              <Textarea {...field} maxLength={300} className="bg-chainspace-dark-gray border-chainspace-orange/30 text-chainspace-white" />
            </FormControl>
            <div className="text-right text-sm text-chainspace-white/50">
              {field.value?.length || 0}/300
            </div>
            <FormMessage className="text-destructive" />
          </FormItem>} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={form.control} name="githubProfile" render={({
        field
      }) => <FormItem>
              <FormLabel className="text-chainspace-white">GitHub Profile</FormLabel>
              <FormControl>
                <Input {...field} type="url" placeholder="https://github.com/username" className="bg-chainspace-dark-gray border-chainspace-orange/30 text-chainspace-white" />
              </FormControl>
              <FormMessage className="text-destructive" />
            </FormItem>} />

        <FormField control={form.control} name="linkedinProfile" render={({
        field
      }) => <FormItem>
              <FormLabel className="text-chainspace-white">LinkedIn Profile</FormLabel>
              <FormControl>
                <Input {...field} type="url" placeholder="https://linkedin.com/in/username" className="bg-chainspace-dark-gray border-chainspace-orange/30 text-chainspace-white" />
              </FormControl>
              <FormMessage className="text-destructive" />
            </FormItem>} />
      </div>

      <FormField control={form.control} name="personalProjects" render={({
      field
    }) => <FormItem>
            <FormLabel className="text-chainspace-white">Personal Projects/Websites</FormLabel>
            <FormControl>
              <Input {...field} type="url" placeholder="https://your-project.com" className="bg-chainspace-dark-gray border-chainspace-orange/30 text-chainspace-white" />
            </FormControl>
            <FormMessage className="text-destructive" />
          </FormItem>} />
    </div>

    <div className="text-center pt-6 border-t border-chainspace-orange/20">
      <div className="text-chainspace-orange font-semibold mb-2">
        🎉 You're almost done!
      </div>
      <p className="text-chainspace-white/70 text-sm">
        Review your information and submit your application. We'll contact you within 7 business days.
      </p>
    </div>
  </div>;
export default ApplicationFormModal;